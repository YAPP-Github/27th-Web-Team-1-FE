import { useState } from 'react';
import { useUpdateTitle, getGetSelectableAlbumsQueryKey } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';

const useAlbumRename = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albumName, setAlbumName] = useState('');

  const { mutate: updateTitle, isPending: isUpdating } = useUpdateTitle();

  const openRenameModal = (initialTitle: string = '') => {
    setAlbumName(initialTitle);
    setIsModalOpen(true);
  };

  const closeRenameModal = () => {
    setIsModalOpen(false);
  };

  const confirmRename = (albumId: number) => {
    const nextTitle = albumName.trim();
    if (!nextTitle) return;

    updateTitle(
      { id: albumId, data: { title: nextTitle } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSelectableAlbumsQueryKey() });
          queryClient.invalidateQueries({ queryKey: ['albumPhotos', albumId] });
          showToast('앨범 이름이 변경되었어요');
          closeRenameModal();
        },
        onError: () => {
          showToast('앨범 이름 변경에 실패했어요');
        },
      },
    );
  };

  return {
    isModalOpen,
    isUpdating,
    albumName,
    setAlbumName,
    openRenameModal,
    closeRenameModal,
    confirmRename,
  };
};

export default useAlbumRename;
