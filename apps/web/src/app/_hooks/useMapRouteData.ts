'use client';

import { useQuery } from '@tanstack/react-query';
import { LocationState } from '@/types/map.type';
import { DEFAULT_ZOOM } from '../constants';
import { useMapHomeAlbums } from '@/hooks/queries/useMapHomeAlbums';
import { useAlbumPhotos } from '@/hooks/queries/useAlbumPhotos';
import { useMapPhotos } from '@/hooks/queries/useMapPhotos';
import {
  useGetAlbumMapInfo,
  useGetClusterPhotos,
  getGetLocationInfoQueryOptions,
  type AlbumWithPhotosResponse,
  type LocationInfoResponse,
} from '@repo/api-client';
import {
  SHEET_CONTEXT_TYPE,
  type SheetContext,
} from '@/components/bottomSheet/constants';
import { calculateBbox } from '../_utils/mapRoute.calc';

interface UseMapRouteDataProps {
  viewState: LocationState | null;
  sheetContext: SheetContext;
  selectedAlbumId: number | null;
}

interface UseMapRouteDataReturn {
  albumList: AlbumWithPhotosResponse[];
  address: string | null;
  albumDetail: AlbumWithPhotosResponse | undefined | null;
  albumMapInfo:
    | {
        centerLongitude?: number;
        centerLatitude?: number;
      }
    | undefined;
  mapPins: ReturnType<typeof useMapPhotos>['mapPins'];
  clusterLocationData: LocationInfoResponse | undefined;
  clusterPhotosData:
    | {
        totalElements?: number;
      }
    | undefined;
}

/**
 * 지도 표시에 필요한 모든 데이터를 페칭하는 커스텀 훅
 * - 사용자의 현재 위치 근처 앨범 리스트
 * - 선택된 앨범의 상세 정보 및 맵 정보
 * - 클러스터의 위치 및 사진 정보
 * - 현재 줌/바운드 영역 내의 사진 핀
 */
export const useMapRouteData = ({
  viewState,
  sheetContext,
  selectedAlbumId,
}: UseMapRouteDataProps): UseMapRouteDataReturn => {
  // 앨범 리스트 조회 (사용자의 현재 위치 기반)
  const { albumList, address } = useMapHomeAlbums({
    longitude: viewState?.longitude,
    latitude: viewState?.latitude,
  });

  // 선택된 앨범의 상세 정보 조회
  const { albumDetail } = useAlbumPhotos(selectedAlbumId);

  // 선택된 앨범의 맵 정보 (중심 좌표) 조회
  const { data: albumMapInfo } = useGetAlbumMapInfo(selectedAlbumId ?? 0);

  // 현재 맵 범위 내의 사진 핀 조회
  const { mapPins } = useMapPhotos({
    zoom: viewState?.zoom ?? DEFAULT_ZOOM,
    bbox: viewState ? calculateBbox(viewState) : '',
    albumId: selectedAlbumId,
  });

  // 클러스터의 위치 정보 조회
  const clusterLatitude =
    sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL && 'latitude' in sheetContext
      ? sheetContext.latitude
      : null;
  const clusterLongitude =
    sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL && 'longitude' in sheetContext
      ? sheetContext.longitude
      : null;

  const { data: clusterLocationData } = useQuery({
    ...getGetLocationInfoQueryOptions({
      longitude: clusterLongitude ?? 0,
      latitude: clusterLatitude ?? 0,
    }),
    enabled: !!clusterLatitude && !!clusterLongitude,
  });

  // 클러스터의 사진 정보 조회
  const clusterId =
    sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL && 'clusterId' in sheetContext
      ? sheetContext.clusterId
      : null;

  const { data: clusterPhotosData } = useGetClusterPhotos(clusterId ?? '', {
    page: 0,
    size: 1,
  });

  return {
    albumList,
    address,
    albumDetail,
    albumMapInfo,
    mapPins,
    clusterLocationData,
    clusterPhotosData,
  };
};
