import { useQuery } from '@tanstack/react-query';
import { getMe, getGetMeQueryKey } from '@repo/api-client';
import { useMemo } from 'react';
import type { MapPin } from '@/types/map.type';

interface UseMapMeParams {
  longitude?: number;
  latitude?: number;
  zoom: number;
  bbox: string;
  albumId?: number | null;
}

/**
 * /map/me API를 호출하여 앨범, 사진, 클러스터 데이터를 한 번에 조회
 * - albums: useMapMeAlbums로 별도 관리됨
 * - photos/clusters: 이 훅에서 mapPins로 변환
 */
export const useMapMe = ({
  longitude,
  latitude,
  zoom,
  bbox,
  albumId,
}: UseMapMeParams) => {
  const isValid = !!(longitude !== undefined && latitude !== undefined && bbox);
  const roundedZoom = Math.round(zoom);

  const params = {
    longitude: longitude ?? 0,
    latitude: latitude ?? 0,
    zoom: roundedZoom,
    bbox: bbox || '',
    ...(albumId ? { albumId } : {}),
  };

  const response = useQuery({
    queryKey: getGetMeQueryKey(params),
    queryFn: ({ signal }) => getMe(params, signal),
    enabled: isValid,
  });

  const address = useMemo(() => {
    if (!isValid) return '';
    return response.data?.location?.address ?? '';
  }, [response.data?.location?.address, isValid]);

  const mapPins: MapPin[] = useMemo(() => {
    const data = response.data;
    if (!data) return [];

    const photoPins: MapPin[] = (data.photos ?? []).map((photo) => ({
      id: photo.id ?? 0,
      albumId: 0,
      latitude: photo.latitude ?? 0,
      longitude: photo.longitude ?? 0,
      imageUrl: photo.thumbnailUrl ?? '',
      imageCount: 1,
      isCluster: false,
    }));

    const clusterPins: MapPin[] = (data.clusters ?? []).map((cluster) => ({
      id: 0,
      albumId: 0,
      latitude: cluster.latitude ?? 0,
      longitude: cluster.longitude ?? 0,
      imageUrl: cluster.thumbnailUrl ?? '',
      imageCount: cluster.count ?? 1,
      clusterId: cluster.clusterId ?? '',
      isCluster: true,
    }));

    return roundedZoom >= 15 ? photoPins : clusterPins;
  }, [response.data, roundedZoom]);

  return {
    address,
    mapPins,
    totalHistoryCount: response.data?.totalHistoryCount,
    clusters: response.data?.clusters ?? [],
    photos: response.data?.photos ?? [],
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
