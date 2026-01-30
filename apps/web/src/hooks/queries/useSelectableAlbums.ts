import { useGetSelectableAlbums, type SelectableAlbum } from '@repo/api-client';

export const useSelectableAlbums = () => {
  const response = useGetSelectableAlbums();

  const albumList: SelectableAlbum[] = response.data?.albums ?? [];

  return {
    albumList,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
