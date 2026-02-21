import { useUpdate, getGetPhotoDetailQueryKey } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast/ToastProvider';
import { usePhotoContext } from '@/app/photo/_contexts/PhotoContext';
import type { PhotoLocation } from '@/app/photo/add/_types/photo';

interface EditData {
  photoId: number;
  memo?: string;
  albumId?: number | null;
  location: PhotoLocation;
}

const usePhotoEdit = () => {
  const { editingPhotoId, setEditingPhotoId, initPhotoEditState } = usePhotoContext();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // editingPhotoId가 있으면 수정 중인 상태
  const isEditing = editingPhotoId !== null;

  const { mutate: updatePhoto, isPending: isSaving } = useUpdate({
    mutation: {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: getGetPhotoDetailQueryKey(variables.id),
        });
        showToast('기록이 수정되었어요');
        setEditingPhotoId(null);
        initPhotoEditState({});
      },
      onError: (error) => {
        console.error('사진 수정 실패:', error);
        showToast('수정에 실패했어요. 다시 시도해주세요');
      },
    },
  });

  const openEditOverlay = (photoId: number) => {
    setEditingPhotoId(photoId);
  };

  const closeEditOverlay = () => {
    setEditingPhotoId(null);
    initPhotoEditState({});
  };

  const saveEdit = (data: EditData) => {
    updatePhoto({
      id: data.photoId,
      data: {
        description: data.memo,
        albumId: data.albumId as number | undefined,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      },
    });
  };

  return {
    isEditing,
    isSaving,
    editingPhotoId,
    openEditOverlay,
    closeEditOverlay,
    saveEdit,
  };
};

export default usePhotoEdit;
