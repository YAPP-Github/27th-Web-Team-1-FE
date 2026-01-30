import { getGetSelectableAlbumsQueryKey, useDelete1 } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/toast';

const useDeleteAlbum = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
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
          showToast('앨범이 삭제되었어요');
          closeDeleteModal();
          router.back();
        },
        onError: () => {
          showToast('앨범 삭제에 실패했어요');
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
