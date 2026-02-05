import { LocationState } from '@/types/map.type';
import { SHEET_CONTEXT_TYPE } from '@/components/bottomSheet/constants';
import type { SheetContext } from '@/components/bottomSheet/constants';
import type { AlbumWithPhotosResponse, BoundingBoxResponse } from '@repo/api-client';

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

    // 범위 내에 있으면 센터 좌표 사용
    if (isWithinBounds) {
      return {
        longitude: centerLng,
        latitude: centerLat,
        zoom: 12, // 적절한 기본 줌
      };
    }
  }

  // 센터가 없거나 범위를 벗어났으면 boundingBox로 계산
  return calculateCenterFromBoundingBox(boundingBox);
};

/**
 * 바운딩박스로부터 중심 좌표와 적절한 줌 레벨을 계산합니다.
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

  // 중심 좌표 계산
  const longitude = (boundingBox.west + boundingBox.east) / 2;
  const latitude = (boundingBox.south + boundingBox.north) / 2;

  // 줌 레벨 계산: 바운딩박스의 범위 크기로부터 적절한 줌 계산
  const latDiff = Math.abs(boundingBox.north - boundingBox.south);
  const lngDiff = Math.abs(boundingBox.east - boundingBox.west);
  const maxDiff = Math.max(latDiff, lngDiff);

  // Mapbox 줌 레벨 공식
  let zoom = 10;
  if (maxDiff > 10) zoom = 4;
  else if (maxDiff > 5) zoom = 5;
  else if (maxDiff > 2) zoom = 6;
  else if (maxDiff > 1) zoom = 8;
  else if (maxDiff > 0.5) zoom = 10;
  else if (maxDiff > 0.1) zoom = 12;
  else zoom = 14;

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
