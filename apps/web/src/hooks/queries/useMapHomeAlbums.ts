import { getMapMe, getGetMapMeQueryKey, type AlbumThumbnails } from '@repo/api-client';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

interface UseMapHomeAlbumsParams {
  longitude?: number;
  latitude?: number;
}

export const useMapHomeAlbums = ({ longitude, latitude }: UseMapHomeAlbumsParams) => {
  const isValid = longitude !== undefined && latitude !== undefined;
  const [prevAlbumList, setPrevAlbumList] = useState<AlbumThumbnails[]>([]);
  const [prevAddress, setPrevAddress] = useState('');

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

  // 새로운 데이터가 도착하면 캐시 갱신 (렌더 중 상태 조정 패턴)
  const responseData = response.data;
  const [prevResponseData, setPrevResponseData] = useState(responseData);
  if (responseData !== prevResponseData) {
    setPrevResponseData(responseData);
    if (responseData !== undefined) {
      setPrevAlbumList(responseData.albums ?? []);
    }
    const newAddr = responseData?.location?.address;
    if (newAddr) {
      setPrevAddress(newAddr);
    }
  }

  const albumList: AlbumThumbnails[] = useMemo(() => {
    if (!isValid) return prevAlbumList;

    // API 요청이 성공하면 결과를 신뢰 (빈 배열도 유효한 결과)
    if (responseData !== undefined) {
      return responseData.albums ?? [];
    }

    // 로딩 중에는 이전 데이터 유지
    return prevAlbumList;
  }, [responseData, isValid, prevAlbumList]);

  const newAddress = responseData?.location?.address;
  const address = isValid ? (newAddress ?? prevAddress) : '';

  return {
    albumList,
    address,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
