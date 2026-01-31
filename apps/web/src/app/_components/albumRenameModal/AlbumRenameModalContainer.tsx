'use client';

import { forwardRef, useImperativeHandle } from 'react';
import useAlbumRename from '../../_hooks/useAlbumRename';
import AlbumRenameModal from './AlbumRenameModal';

interface AlbumRenameModalContainerProps {
  selectedAlbumId?: number;
}

export interface AlbumRenameModalContainerHandle {
  open: (title: string) => void;
}

export const AlbumRenameModalContainer = forwardRef<
  AlbumRenameModalContainerHandle,
  AlbumRenameModalContainerProps
>(({ selectedAlbumId }, ref) => {
  const {
    isModalOpen,
    isUpdating,
    albumName,
    setAlbumName,
    openRenameModal,
    closeRenameModal,
    confirmRename,
  } = useAlbumRename();

  useImperativeHandle(ref, () => ({
    open: (title: string) => {
      openRenameModal(title);
    },
  }));

  const handleConfirm = () => {
    if (!selectedAlbumId) return;
    confirmRename(selectedAlbumId);
  };

  return (
    <AlbumRenameModal
      isOpen={isModalOpen}
      isUpdating={isUpdating}
      albumName={albumName}
      onChangeAlbumName={setAlbumName}
      onClose={closeRenameModal}
      onConfirm={handleConfirm}
    />
  );
});
