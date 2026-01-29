import { useState } from 'react';
import { useUpdate, getGetPhotoDetailQueryKey } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast/ToastProvider';

interface EditData {
  photoId: number;
  memo?: string;
  albumId?: number;
  location?: { latitude: number; longitude: number };
}

const usePhotoEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: updatePhoto, isPending: isSaving } = useUpdate({
    mutation: {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: getGetPhotoDetailQueryKey(variables.id),
        });
        showToast('기록이 수정되었어요');
        setIsEditing(false);
        setEditingPhotoId(null);
      },
      onError: (error) => {
        console.error('사진 수정 실패:', error);
        showToast('수정에 실패했어요. 다시 시도해주세요');
      },
    },
  });

  const openEditOverlay = (photoId: number) => {
    setEditingPhotoId(photoId);
    setIsEditing(true);
  };

  const closeEditOverlay = () => {
    setIsEditing(false);
    setEditingPhotoId(null);
  };

  const saveEdit = (data: EditData) => {
    updatePhoto({
      id: data.photoId,
      data: {
        description: data.memo,
        albumId: data.albumId,
        latitude: data.location?.latitude,
        longitude: data.location?.longitude,
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
