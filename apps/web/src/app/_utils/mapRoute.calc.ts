import { LocationState } from '@/types/map.type';
import { SHEET_CONTEXT_TYPE } from '@/components/bottomSheet/constants';
import type { SheetContext } from '@/components/bottomSheet/constants';
import type { AlbumWithPhotosResponse, BoundingBoxResponse } from '@repo/api-client';
import { BBOX_ZOOM_CALCULATION } from '@/constants/map';

/**
 * 중심 좌표가 바운딩박스 범위 내에 있는지 검증합니다.
 * 센터가 범위를 벗어났다면 boundingBox 기반으로 재계산합니다.
 * @param centerLng - 센터 경도
 * @param centerLat - 센터 위도
 * @param boundingBox - 바운딩박스 정보
 * @returns 검증된 중심 좌표 또는 boundingBox 기반 계산된 좌표
 */
export const validateCenterCoordinate = (
  centerLng: number | undefined,
  centerLat: number | undefined,
  boundingBox: BoundingBoxResponse | undefined,
): { longitude: number; latitude: number; zoom: number } | null => {
  // boundingBox가 없으면 검증 불가
  if (
    !boundingBox?.west ||
    !boundingBox?.south ||
    !boundingBox?.east ||
    !boundingBox?.north
  ) {
    return null;
  }

  // 센터 좌표가 있으면 boundingBox 범위 내인지 확인
  if (centerLng !== undefined && centerLat !== undefined) {
    const isWithinBounds =
      centerLng >= boundingBox.west &&
      centerLng <= boundingBox.east &&
      centerLat >= boundingBox.south &&
      centerLat <= boundingBox.north;

    // 범위 내에 있으면 센터 좌표 사용하되, 줌은 boundingBox 크기로 계산
    if (isWithinBounds) {
      const centerFromBbox = calculateCenterFromBoundingBox(boundingBox);
      if (centerFromBbox) {
        return {
          longitude: centerLng,
          latitude: centerLat,
          zoom: centerFromBbox.zoom, // boundingBox 크기에 따라 계산된 줌 사용
        };
      }
    }
  }

  // 센터가 없거나 범위를 벗어났으면 boundingBox로 계산
  return calculateCenterFromBoundingBox(boundingBox);
};

/**
 * 바운딩박스로부터 중심 좌표와 적절한 줌 레벨을 계산합니다.
 *
 * 백엔드는 화면에 보이는 범위를 1이라 할 때 세로 3배, 가로 3.3배로 늘려서 범위를 제공합니다.
 * 따라서 줌 레벨 계산 시 이를 보정하여 실제 필요한 줌 레벨을 계산합니다.
 *
 * @param boundingBox - 바운딩박스 정보 {west, south, east, north}
 * @returns {longitude, latitude, zoom} 중심 좌표와 줌 레벨
 */
export const calculateCenterFromBoundingBox = (
  boundingBox: BoundingBoxResponse,
): { longitude: number; latitude: number; zoom: number } | null => {
  if (
    !boundingBox.west ||
    !boundingBox.south ||
    !boundingBox.east ||
    !boundingBox.north
  ) {
    return null;
  }

  // 중심 좌표 계산 (위도는 남쪽으로 편향해서 바텀시트가 가리지 않도록 함)
  const longitude = (boundingBox.west + boundingBox.east) / 2;
  // 바운딩박스 범위에서 남쪽 75% 지점을 지도 중심으로 설정
  const latitudeRange = boundingBox.north - boundingBox.south;
  const latitude = boundingBox.south + latitudeRange * 0.01;

  // 줌 레벨 계산: 바운딩박스의 범위 크기로부터 적절한 줌 계산
  const latDiff = Math.abs(boundingBox.north - boundingBox.south);
  const lngDiff = Math.abs(boundingBox.east - boundingBox.west);

  // 백엔드가 확대된 범위를 제공하므로 보정
  // Mapbox 줌 레벨 공식: 전체 바운딩박스가 화면에 보이도록 계산
  // 경도 기반: zoom = log2(360 * BACKEND_LNG_EXPANSION_RATIO / (lngDiff * ZOOM_LEVEL_ADJUSTMENT_FACTOR)) - 1
  // 위도 기반: zoom = log2(180 * BACKEND_LAT_EXPANSION_RATIO / (latDiff * ZOOM_LEVEL_ADJUSTMENT_FACTOR)) - 1
  // 두 값 중 더 작은 값을 선택해서 전체 영역이 보이도록 함
  const lngZoom =
    lngDiff > 0
      ? Math.log2(
          (360 * BBOX_ZOOM_CALCULATION.BACKEND_LNG_EXPANSION_RATIO) /
            (lngDiff * BBOX_ZOOM_CALCULATION.ZOOM_LEVEL_ADJUSTMENT_FACTOR),
        ) - 1
      : BBOX_ZOOM_CALCULATION.DEFAULT_ZOOM;
  const latZoom =
    latDiff > 0
      ? Math.log2(
          (180 * BBOX_ZOOM_CALCULATION.BACKEND_LAT_EXPANSION_RATIO) /
            (latDiff * BBOX_ZOOM_CALCULATION.ZOOM_LEVEL_ADJUSTMENT_FACTOR),
        ) - 1
      : BBOX_ZOOM_CALCULATION.DEFAULT_ZOOM;
  const zoom = Math.max(0, Math.min(lngZoom, latZoom));

  return { longitude, latitude, zoom };
};

/**
 * 현재 지도 위치 정보로부터 바운딩박스 좌표를 계산합니다.
 * @param viewState - 현재 지도의 위치 및 줌 정보
 * @returns "west,south,east,north" 형식의 바운딩박스 문자열
 */
export const calculateBbox = (viewState: LocationState): string => {
  const offset = 0.05;
  const west = viewState.longitude - offset;
  const south = viewState.latitude - offset;
  const east = viewState.longitude + offset;
  const north = viewState.latitude + offset;
  return `${west},${south},${east},${north}`;
};

/**
 * URL 경로에서 앨범 ID를 추출합니다.
 * @param pathname - 현재 URL 경로 (예: /album/123)
 * @returns 추출된 앨범 ID 또는 null
 */
export const extractAlbumIdFromPath = (pathname: string): number | null => {
  const match = pathname.match(/^\/album\/(\d+)/);
  if (!match) return null;
  const parsedId = Number(match[1]);
  return Number.isNaN(parsedId) ? null : parsedId;
};

/**
 * 현재 선택된 앨범 ID를 결정합니다.
 * 경로에서 온 ID가 있으면 우선, 없으면 바텀시트 컨텍스트에서 결정합니다.
 * @param albumIdFromPath - URL 경로에서 추출한 앨범 ID
 * @param sheetContext - 바텀시트 컨텍스트
 * @returns 선택된 앨범 ID 또는 null
 */
export const getSelectedAlbumId = (
  albumIdFromPath: number | null,
  sheetContext: SheetContext,
): number | null => {
  if (albumIdFromPath !== null) {
    return albumIdFromPath;
  }

  if (
    sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL &&
    'albumId' in sheetContext
  ) {
    return sheetContext.albumId;
  }

  return null;
};

/**
 * 현재 표시해야 할 사진의 개수를 계산합니다.
 * 바텀시트 타입에 따라 다른 출처에서 값을 가져옵니다.
 * @param sheetContext - 바텀시트 컨텍스트
 * @param albumDetail - 선택된 앨범의 상세 정보
 * @param clusterPhotosTotal - 클러스터의 전체 사진 개수
 * @param totalHistoryCount - 전체 기록 개수
 * @returns 계산된 사진 개수
 */
export const calculatePhotoCount = (
  sheetContext: SheetContext,
  albumDetail: AlbumWithPhotosResponse | undefined | null,
  clusterPhotosTotal: number | undefined,
  totalHistoryCount: number | undefined,
): number => {
  if (sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL) {
    return albumDetail?.photoCount ?? 0;
  }

  if (sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL) {
    return clusterPhotosTotal ?? 0;
  }

  return totalHistoryCount ?? 0;
};

/**
 * 앨범의 실제 사진 위치들로부터 올바른 중심 좌표와 줌 레벨을 계산합니다.
 * @param photos - 사진 배열 (location 정보 포함)
 * @returns {longitude, latitude, zoom} 중심 좌표와 줌 레벨, 또는 null
 */
export const calculateCenterFromAlbumPhotos = (
  photos:
    | Array<{ location?: { longitude?: number; latitude?: number } | null }>
    | undefined,
): { longitude: number; latitude: number; zoom: number } | null => {
  if (!photos || photos.length === 0) {
    return null;
  }

  // 유효한 location을 가진 사진들만 필터링
  const validPhotos = photos.filter(
    (p) =>
      p.location &&
      typeof p.location.longitude === 'number' &&
      typeof p.location.latitude === 'number',
  );

  if (validPhotos.length === 0) {
    return null;
  }

  // 모든 사진의 경도/위도 범위 계산
  const { minLng, maxLng, minLat, maxLat } = validPhotos.reduce(
    (acc, photo) => {
      const lng = photo.location!.longitude as number;
      const lat = photo.location!.latitude as number;
      return {
        minLng: Math.min(acc.minLng, lng),
        maxLng: Math.max(acc.maxLng, lng),
        minLat: Math.min(acc.minLat, lat),
        maxLat: Math.max(acc.maxLat, lat),
      };
    },
    { minLng: Infinity, maxLng: -Infinity, minLat: Infinity, maxLat: -Infinity },
  );

  const boundingBox = {
    west: minLng,
    east: maxLng,
    south: minLat,
    north: maxLat,
  };

  // 계산한 boundingBox로부터 중심과 줌 계산
  return calculateCenterFromBoundingBox(boundingBox);
};
