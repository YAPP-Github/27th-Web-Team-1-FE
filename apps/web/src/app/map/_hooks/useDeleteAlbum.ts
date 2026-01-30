import { getGetSelectableAlbumsQueryKey, useDelete1 } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useDeleteAlbum = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteAlbum, isPending: isDeleting } = useDelete1();

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
          queryClient.invalidateQueries({ queryKey: ['albumPhotos', albumId] });
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
