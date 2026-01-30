import { useState } from 'react';
import { useUpdateTitle, getGetSelectableAlbumsQueryKey } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';

const useAlbumRename = () => {
  const queryClient = useQueryClient();
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
          closeRenameModal();
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
