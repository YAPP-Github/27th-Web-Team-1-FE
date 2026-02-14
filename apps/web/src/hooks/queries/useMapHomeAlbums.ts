import { getMe, getGetMeQueryKey, type AlbumThumbnails } from '@repo/api-client';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';

interface UseMapHomeAlbumsParams {
  longitude?: number;
  latitude?: number;
}

export const useMapHomeAlbums = ({ longitude, latitude }: UseMapHomeAlbumsParams) => {
  const isValid = longitude !== undefined && latitude !== undefined;
  const prevAddressRef = useRef<string>('');
  const prevAlbumListRef = useRef<AlbumThumbnails[]>([]);

  const params = {
    longitude: longitude ?? 0,
    latitude: latitude ?? 0,
    zoom: 0,
  };

  const response = useQuery({
    queryKey: getGetMeQueryKey(params),
    queryFn: ({ signal }) => getMe(params, signal),
    enabled: isValid,
    placeholderData: keepPreviousData,
  });

  const albumList: AlbumThumbnails[] = useMemo(() => {
    if (!isValid) return prevAlbumListRef.current;

    const newAlbums = response.data?.albums ?? [];
    if (newAlbums.length > 0) {
      prevAlbumListRef.current = newAlbums;
      return newAlbums;
    }
    return prevAlbumListRef.current;
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
