import { useState } from 'react';
import {
  useUpdateTitle,
  getGetSelectableAlbumsQueryKey,
  getGetPhotosQueryKey,
} from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';

const useAlbumRename = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [albumName, setAlbumName] = useState('');

  const { mutate: updateTitle, isPending: isUpdating } = useUpdateTitle();

  const confirmRename = (albumId: number) => {
    const nextTitle = albumName.trim();
    if (!nextTitle) return;

    updateTitle(
      { id: albumId, data: { title: nextTitle } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSelectableAlbumsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetPhotosQueryKey(albumId) });
          queryClient.invalidateQueries({ queryKey: ['albumPhotos', albumId] });
          showToast('앨범 이름이 변경되었어요');
          onSuccess?.();
        },
        onError: () => {
          showToast('앨범 이름 변경에 실패했어요');
        },
      },
    );
  };

  return {
    isUpdating,
    albumName,
    setAlbumName,
    confirmRename,
  };
};

export default useAlbumRename;
