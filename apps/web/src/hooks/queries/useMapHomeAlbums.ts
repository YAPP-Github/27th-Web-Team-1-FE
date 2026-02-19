import { getMapMe, getGetMapMeQueryKey, type AlbumThumbnails } from '@repo/api-client';
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
    queryKey: getGetMapMeQueryKey(params),
    queryFn: ({ signal }) => getMapMe(params, signal),
    enabled: isValid,
    placeholderData: keepPreviousData,
  });

  const albumList: AlbumThumbnails[] = useMemo(() => {
    if (!isValid) return prevAlbumListRef.current;

    // API 요청이 성공하면 결과를 신뢰 (빈 배열도 유효한 결과)
    if (response.data !== undefined) {
      const newAlbums = response.data.albums ?? [];
      prevAlbumListRef.current = newAlbums;
      return newAlbums;
    }

    // 로딩 중에는 이전 데이터 유지
    return prevAlbumListRef.current;
  }, [response.data, isValid]);

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
