import { useQuery } from '@tanstack/react-query';
import { customFetcher, type SelectableAlbumResponse } from '@repo/api-client';
import { useMemo } from 'react';
import type { Album } from '@/types/album.type';

const fetchSelectableAlbums = (signal?: AbortSignal) => {
  return customFetcher<SelectableAlbumResponse>({
    url: '/albums/selectable',
    method: 'GET',
    signal,
  });
};

export const useSelectableAlbums = () => {
  const query = useQuery({
    queryKey: ['selectableAlbums'],
    queryFn: ({ signal }) => fetchSelectableAlbums(signal),
  });

  const albumList: Album[] = useMemo(() => {
    return (query.data?.albums ?? []).map((album) => ({
      id: album.id ?? 0,
      title: album.title ?? '알 수 없는 앨범',
      // TODO: API 스펙 변경 시 photoList가 string[]으로 변경될 수 있음
      photoList: album.thumbnailUrl
        ? [{ photoId: 'thumbnail', src: album.thumbnailUrl }]
        : [],
      photoCount: album.photoCount ?? 0,
    }));
  }, [query.data]);

  return {
    albumList,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
