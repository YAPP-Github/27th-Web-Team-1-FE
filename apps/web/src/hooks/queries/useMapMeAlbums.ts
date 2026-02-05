import { useQuery } from '@tanstack/react-query';
import { getMe, getGetMeQueryKey, type AlbumThumbnails } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseMapMeAlbumsParams {
  longitude?: number;
  latitude?: number;
  zoom: number;
  bbox: string;
  albumId?: number | null;
}

export const getMapMeAlbumsQueryKey = () => ['mapMe', 'albums'] as const;

/**
 * /map/me에서 albums 데이터만 추출하여 별도 쿼리로 관리
 * ['mapMe', 'albums'] 쿼리를 직접 구독하므로,
 * 앨범 추가 후 이 쿼리만 invalidate하면 자동으로 refetch됨
 */
export const useMapMeAlbums = ({
  longitude,
  latitude,
  zoom,
  bbox,
  albumId,
}: UseMapMeAlbumsParams) => {
  const isValid = !!(longitude !== undefined && latitude !== undefined && bbox);
  const queryClient = useQueryClient();
  const roundedZoom = Math.round(zoom);

  const params = {
    longitude: longitude ?? 0,
    latitude: latitude ?? 0,
    zoom: roundedZoom,
    bbox: bbox || '',
    ...(albumId ? { albumId } : {}),
  };

  // /map/me 데이터 가져오기 (백그라운드)
  const mapMeResponse = useQuery({
    queryKey: getGetMeQueryKey(params),
    queryFn: ({ signal }) => getMe(params, signal),
    enabled: isValid,
  });

  // /map/me 응답에서 albums을 별도 쿼리 키로 저장
  useEffect(() => {
    if (mapMeResponse.data?.albums) {
      queryClient.setQueryData(
        getMapMeAlbumsQueryKey(),
        mapMeResponse.data.albums as AlbumThumbnails[],
      );
    }
  }, [mapMeResponse.data?.albums, queryClient]);

  // ['mapMe', 'albums'] 쿼리를 직접 구독
  // invalidate되면 이 쿼리가 자동으로 refetch됨
  const albumsResponse = useQuery({
    queryKey: getMapMeAlbumsQueryKey(),
    queryFn: async () => {
      // /map/me를 호출해서 albums 데이터만 추출
      const data = await getMe(params);
      return data.albums ?? [];
    },
    enabled: isValid,
  });

  const albumList: AlbumThumbnails[] = albumsResponse.data ?? [];

  return {
    albumList,
    isLoading: albumsResponse.isLoading,
    isError: albumsResponse.isError,
    error: albumsResponse.error,
  };
};
