import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDelete,
  getGetSelectableAlbumsQueryKey,
  getGetPhotosQueryKey,
} from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';

const useDeleteAlbum = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteAlbum, isPending: isDeleting } = useDelete();

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = (albumId: number) => {
    deleteAlbum(
      { id: albumId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSelectableAlbumsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetPhotosQueryKey(albumId) });
          closeDeleteModal();
          router.back();
        },
      },
    );
  };

  return {
    isModalOpen,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default useDeleteAlbum;
