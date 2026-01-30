import {
  getGetPhotosQueryKey,
  useGetPhotos,
  type AlbumWithPhotosResponse,
} from '@repo/api-client';

export const useAlbumPhotos = (albumId: number | null) => {
  const response = useGetPhotos(albumId ?? 0, {
    query: {
      queryKey: getGetPhotosQueryKey(albumId ?? 0),
      enabled: albumId !== null,
    },
  });

  const albumDetail: AlbumWithPhotosResponse | null = response.data?.albums?.[0] ?? null;

  return {
    albumDetail,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
