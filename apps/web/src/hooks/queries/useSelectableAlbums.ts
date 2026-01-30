import type { Album } from '@/types/album.type';
import { useGetSelectableAlbums } from '@repo/api-client';
import { useMemo } from 'react';

export const useSelectableAlbums = () => {
  const response = useGetSelectableAlbums();

  const albumList: Album[] = useMemo(() => {
    return (response.data?.albums ?? []).map((album) => ({
      id: album.id ?? 0,
      title: album.title ?? '알 수 없는 앨범',
      photoList: album.thumbnailUrl
        ? [{ photoId: 'thumbnail', src: album.thumbnailUrl }]
        : [],
      photoCount: album.photoCount ?? 0,
    }));
  }, [response.data]);

  return {
    albumList,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
