'use client';

import { forwardRef, useImperativeHandle } from 'react';
import useAlbumAdd from '../../_hooks/useAlbumAdd';
import AlbumAddModal from './AlbumAddModal';

export interface AlbumAddModalContainerHandle {
  open: () => void;
}

export const AlbumAddModalContainer = forwardRef<AlbumAddModalContainerHandle>((_, ref) => {
  const {
    isModalOpen,
    isCreating,
    albumName,
    setAlbumName,
    openAddModal,
    closeAddModal,
    confirmAdd,
  } = useAlbumAdd();

  useImperativeHandle(ref, () => ({
    open: () => {
      openAddModal();
    },
  }));

  return (
    <AlbumAddModal
      isOpen={isModalOpen}
      isCreating={isCreating}
      albumName={albumName}
      onChangeAlbumName={setAlbumName}
      onClose={closeAddModal}
      onConfirm={confirmAdd}
    />
  );
});
