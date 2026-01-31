'use client';

import useAlbumAdd from '../../_hooks/useAlbumAdd';
import AlbumAddModal from './AlbumAddModal';

interface AlbumAddModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlbumAddModalContainer({ isOpen, onClose }: AlbumAddModalContainerProps) {
  const { isCreating, albumName, setAlbumName, confirmAdd } = useAlbumAdd(onClose);

  return (
    <AlbumAddModal
      isOpen={isOpen}
      isCreating={isCreating}
      albumName={albumName}
      onChangeAlbumName={setAlbumName}
      onClose={onClose}
      onConfirm={confirmAdd}
    />
  );
}
