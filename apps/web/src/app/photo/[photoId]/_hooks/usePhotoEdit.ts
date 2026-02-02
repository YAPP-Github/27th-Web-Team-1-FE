import { useState } from 'react';
import { useUpdate, getGetPhotoDetailQueryKey } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast/ToastProvider';
import type { PhotoLocation } from '@/app/photo/add/_types/photo';

interface EditData {
  photoId: number;
  memo?: string;
  albumId?: number;
  location: PhotoLocation;
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
    // TODO: API 스펙 변경 후 타입 단언 제거 (albumId optional 지원 예정)
    updatePhoto({
      id: data.photoId,
      data: {
        description: data.memo,
        albumId: data.albumId as number,
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
