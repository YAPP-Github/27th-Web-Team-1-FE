import { getGetSelectableAlbumsQueryKey, useDelete1 } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/toast';

const useDeleteAlbum = (onSuccess?: () => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: deleteAlbum, isPending: isDeleting } = useDelete1();

  const confirmDelete = (albumId: number) => {
    deleteAlbum(
      { id: albumId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSelectableAlbumsQueryKey() });
          queryClient.invalidateQueries({ queryKey: ['albumPhotos', albumId] });
          showToast('앨범이 삭제되었어요');
          onSuccess?.();
          router.back();
        },
        onError: () => {
          showToast('앨범 삭제에 실패했어요');
        },
      },
    );
  };

  return {
    isDeleting,
    confirmDelete,
  };
};

export default useDeleteAlbum;
