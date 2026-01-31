'use client';

import { useEffect } from 'react';
import useAlbumRename from '../../_hooks/useAlbumRename';
import AlbumRenameModal from './AlbumRenameModal';

interface AlbumRenameModalContainerProps {
  selectedAlbumId?: number;
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
}

export function AlbumRenameModalContainer({
  selectedAlbumId,
  isOpen,
  onClose,
  initialTitle = '',
}: AlbumRenameModalContainerProps) {
  const { isUpdating, albumName, setAlbumName, confirmRename } = useAlbumRename(onClose);

  // 모달이 열릴 때 초기 제목 설정
  useEffect(() => {
    if (isOpen && initialTitle) {
      setAlbumName(initialTitle);
    }
  }, [isOpen, initialTitle, setAlbumName]);

  const handleConfirm = () => {
    if (!selectedAlbumId) return;
    confirmRename(selectedAlbumId);
  };

  return (
    <AlbumRenameModal
      isOpen={isOpen}
      isUpdating={isUpdating}
      albumName={albumName}
      onChangeAlbumName={setAlbumName}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
