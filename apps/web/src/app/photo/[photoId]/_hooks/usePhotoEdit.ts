import { useState } from 'react';

interface EditData {
  photoId: number;
  memo?: string;
  albumId?: number;
  location?: { latitude: number; longitude: number };
}

const usePhotoEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);

  const openEditOverlay = (photoId: number) => {
    setEditingPhotoId(photoId);
    setIsEditing(true);
  };

  const closeEditOverlay = () => {
    setIsEditing(false);
    setEditingPhotoId(null);
  };

  const saveEdit = (data: EditData) => {
    // TODO: 사진 수정 API 연동
    console.log('Save photo edit:', data);
    setIsEditing(false);
    setEditingPhotoId(null);
  };

  return {
    isEditing,
    editingPhotoId,
    openEditOverlay,
    closeEditOverlay,
    saveEdit,
  };
};

export default usePhotoEdit;
