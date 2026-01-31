import { LocationState } from '@/types/map.type';
import { SHEET_CONTEXT_TYPE } from '@/components/bottomSheet/constants';
import type { SheetContext } from '@/components/bottomSheet/constants';
import type { AlbumWithPhotosResponse } from '@repo/api-client';

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
 * @param mapPinsCount - 맵에 표시된 핀의 개수
 * @returns 계산된 사진 개수
 */
export const calculatePhotoCount = (
  sheetContext: SheetContext,
  albumDetail: AlbumWithPhotosResponse | undefined | null,
  clusterPhotosTotal: number | undefined,
  mapPinsCount: number,
): number => {
  if (sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL) {
    return albumDetail?.photoCount ?? 0;
  }

  if (sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL) {
    return clusterPhotosTotal ?? 0;
  }

  return mapPinsCount;
};
