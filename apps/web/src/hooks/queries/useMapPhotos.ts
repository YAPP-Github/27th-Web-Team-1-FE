import { useQuery } from '@tanstack/react-query';
import { customFetcher, type MapPhotosResponse } from '@repo/api-client';
import { useMemo } from 'react';
import type { MapPin } from '@/types/map.type';
import { MAP_CLUSTERING_CONFIG } from '@/constants/map';

interface UseMapPhotosParams {
  zoom: number;
  bbox: string;
  albumId?: number | null;
}

const fetchMapPhotos = (params: UseMapPhotosParams, signal?: AbortSignal) => {
  return customFetcher<MapPhotosResponse>({
    url: '/map/photos',
    method: 'GET',
    params: {
      zoom: params.zoom,
      bbox: params.bbox,
      ...(params.albumId ? { albumId: params.albumId } : {}),
    },
    signal,
  });
};

export const useMapPhotos = (params: UseMapPhotosParams) => {
  const query = useQuery({
    queryKey: ['mapPhotos', params.zoom, params.bbox, params.albumId],
    queryFn: ({ signal }) => fetchMapPhotos(params, signal),
    enabled: Boolean(params.bbox),
  });

  const mapPins: MapPin[] = useMemo(() => {
    const data = query.data;
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

    return params.zoom >= MAP_CLUSTERING_CONFIG.CLIENT_CLUSTERING_MIN_ZOOM
      ? photoPins
      : clusterPins;
  }, [query.data, params.zoom]);

  return {
    mapPins,
    clusters: query.data?.clusters ?? [],
    photos: query.data?.photos ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
