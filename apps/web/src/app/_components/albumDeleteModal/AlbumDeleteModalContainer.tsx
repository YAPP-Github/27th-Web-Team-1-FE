'use client';

import useDeleteAlbum from '../../_hooks/useDeleteAlbum';
import AlbumDeleteModal from './AlbumDeleteModal';

interface AlbumDeleteModalContainerProps {
  selectedAlbumId?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function AlbumDeleteModalContainer({
  selectedAlbumId,
  isOpen,
  onClose,
}: AlbumDeleteModalContainerProps) {
  const { isDeleting, confirmDelete } = useDeleteAlbum(onClose);

  const handleConfirm = () => {
    if (!selectedAlbumId) return;
    confirmDelete(selectedAlbumId);
  };

  return (
    <AlbumDeleteModal
      isOpen={isOpen}
      isDeleting={isDeleting}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
