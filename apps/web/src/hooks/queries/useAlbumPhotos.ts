import type { AlbumDetailData } from '@/types/album.type';
import { getGetPhotosQueryKey, useGetPhotos } from '@repo/api-client';
import { useMemo } from 'react';

export const useAlbumPhotos = (albumId: number | null) => {
  const response = useGetPhotos(albumId ?? 0, {
    query: {
      queryKey: getGetPhotosQueryKey(albumId ?? 0),
      enabled: albumId !== null,
    },
  });

  const albumDetail: AlbumDetailData | null = useMemo(() => {
    const album = response.data?.albums?.[0];
    if (!album) return null;

    return {
      id: album.id ?? 0,
      title: album.title ?? '알 수 없는 앨범',
      photos: (album.photos ?? []).map((photo) => ({
        id: photo.id ?? 0,
        url: photo.url ?? '',
      })),
    };
  }, [response.data]);

  return {
    albumDetail,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
