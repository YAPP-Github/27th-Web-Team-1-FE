import { useQuery } from '@tanstack/react-query';
import { customFetcher, type PhotoListResponse } from '@repo/api-client';
import { useMemo } from 'react';
import type { AlbumDetailData } from '@/types/album.type';

const fetchAlbumPhotos = (albumId: number, signal?: AbortSignal) => {
  return customFetcher<PhotoListResponse>({
    url: '/photos',
    method: 'GET',
    params: { albumId },
    signal,
  });
};

export const useAlbumPhotos = (albumId: number | null) => {
  const query = useQuery({
    queryKey: ['albumPhotos', albumId],
    queryFn: ({ signal }) => fetchAlbumPhotos(albumId!, signal),
    enabled: albumId !== null,
  });

  const albumDetail: AlbumDetailData | null = useMemo(() => {
    const album = query.data?.albums?.[0];
    if (!album) return null;

    return {
      id: album.id ?? 0,
      title: album.title ?? '알 수 없는 앨범',
      photos: (album.photos ?? []).map((photo) => ({
        id: photo.id ?? 0,
        url: photo.url ?? '',
      })),
    };
  }, [query.data]);

  return {
    albumDetail,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
