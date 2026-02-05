import { useDelete1 } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/toast';
import { getMapMeAlbumsQueryKey } from '@/hooks/queries/useMapMeAlbums';

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
          // albums 목록 업데이트 (refetch로 명시적 재요청)
          queryClient.invalidateQueries({ queryKey: getMapMeAlbumsQueryKey() });
          // 지도의 사진/클러스터 업데이트 (/map/me 전체)
          queryClient.refetchQueries({ queryKey: ['/map/me'] });
          // 선택된 앨범 상세 정보 업데이트
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
