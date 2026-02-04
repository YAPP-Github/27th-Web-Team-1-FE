import { useHome, type AlbumThumbnails } from '@repo/api-client';
import { useMemo, useRef } from 'react';

interface UseMapHomeAlbumsParams {
  longitude?: number;
  latitude?: number;
}

export const useMapHomeAlbums = ({ longitude, latitude }: UseMapHomeAlbumsParams) => {
  const isValid = longitude !== undefined && latitude !== undefined;
  const prevAddressRef = useRef<string>('');

  const response = useHome({
    longitude: longitude ?? 0,
    latitude: latitude ?? 0,
  });

  const albumList: AlbumThumbnails[] = useMemo(() => {
    if (!isValid) return [];

    return response.data?.albums ?? [];
  }, [response.data?.albums, isValid]);

  // 새 주소가 있으면 캐싱, 로딩 중에는 이전 주소 유지
  const newAddress = response.data?.location?.address;
  if (newAddress) {
    prevAddressRef.current = newAddress;
  }

  const address = isValid ? (newAddress ?? prevAddressRef.current) : '';

  return {
    albumList,
    address,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
