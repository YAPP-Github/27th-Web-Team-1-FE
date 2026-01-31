import { useHome, type AlbumThumbnails } from '@repo/api-client';
import { useMemo } from 'react';

interface UseMapHomeAlbumsParams {
  longitude?: number;
  latitude?: number;
}

export const useMapHomeAlbums = ({ longitude, latitude }: UseMapHomeAlbumsParams) => {
  const isValid = longitude !== undefined && latitude !== undefined;

  const response = useHome({
    longitude: longitude ?? 0,
    latitude: latitude ?? 0,
  });

  const albumList: AlbumThumbnails[] = useMemo(() => {
    if (!isValid) return [];

    return response.data?.albums ?? [];
  }, [response.data?.albums, isValid]);

  const address = isValid ? (response.data?.location?.address ?? '') : '';

  return {
    albumList,
    address,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
