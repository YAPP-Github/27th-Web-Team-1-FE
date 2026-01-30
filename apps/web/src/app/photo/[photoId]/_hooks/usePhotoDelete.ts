import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDelete } from '@repo/api-client';
import { useToast } from '@/components/toast/ToastProvider';

const usePhotoDelete = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deletePhoto, isPending: isDeleting } = useDelete();

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = (photoId: number) => {
    deletePhoto(
      { id: photoId },
      {
        onSuccess: () => {
          showToast('사진이 삭제되었습니다');
          closeDeleteModal();
          router.back();
        },
        onError: () => {
          showToast('삭제에 실패했습니다. 다시 시도해주세요');
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

export default usePhotoDelete;
