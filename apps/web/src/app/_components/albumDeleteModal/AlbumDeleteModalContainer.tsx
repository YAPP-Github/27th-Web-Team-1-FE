'use client';

import { forwardRef, useImperativeHandle } from 'react';
import useDeleteAlbum from '../../_hooks/useDeleteAlbum';
import AlbumDeleteModal from './AlbumDeleteModal';

interface AlbumDeleteModalContainerProps {
  selectedAlbumId?: number;
}

export interface AlbumDeleteModalContainerHandle {
  open: () => void;
}

export const AlbumDeleteModalContainer = forwardRef<
  AlbumDeleteModalContainerHandle,
  AlbumDeleteModalContainerProps
>(({ selectedAlbumId }, ref) => {
  const {
    isModalOpen,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useDeleteAlbum();

  useImperativeHandle(ref, () => ({
    open: () => {
      openDeleteModal();
    },
  }));

  const handleConfirm = () => {
    if (!selectedAlbumId) return;
    confirmDelete(selectedAlbumId);
  };

  return (
    <AlbumDeleteModal
      isOpen={isModalOpen}
      isDeleting={isDeleting}
      onClose={closeDeleteModal}
      onConfirm={handleConfirm}
    />
  );
});
