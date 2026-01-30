import { useQuery } from '@tanstack/react-query';
import { customFetcher, type AlbumMapInfoResponse } from '@repo/api-client';

export const useAlbumMapInfo = (albumId: number | null) => {
  return useQuery({
    queryKey: ['albumMapInfo', albumId],
    queryFn: ({ signal }) =>
      customFetcher<AlbumMapInfoResponse>({
        url: `/map/albums/${albumId}`,
        method: 'GET',
        signal,
      }),
    enabled: albumId !== null,
  });
};
