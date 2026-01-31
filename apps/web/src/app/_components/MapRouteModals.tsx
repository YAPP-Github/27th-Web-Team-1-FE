'use client';

import AlbumDeleteModal from './albumDeleteModal/AlbumDeleteModal';
import AlbumRenameModal from './albumRenameModal/AlbumRenameModal';
import AlbumAddModal from './albumAddModal/AlbumAddModal';

interface MapRouteModalsProps {
  // 앨범 삭제 모달
  isAlbumDeleteOpen: boolean;
  isAlbumDeleting: boolean;
  onAlbumDeleteClose: () => void;
  onAlbumDeleteConfirm: () => void;

  // 앨범 이름 변경 모달
  isAlbumRenameOpen: boolean;
  isAlbumRenaming: boolean;
  albumName: string;
  onAlbumNameChange: (name: string) => void;
  onAlbumRenameClose: () => void;
  onAlbumRenameConfirm: () => void;

  // 앨범 추가 모달
  isAlbumAddOpen: boolean;
  isAlbumAdding: boolean;
  newAlbumName: string;
  onNewAlbumNameChange: (name: string) => void;
  onAlbumAddClose: () => void;
  onAlbumAddConfirm: () => void;
}

/**
 * 지도 페이지의 모든 모달(앨범 삭제, 이름 변경, 추가)을 렌더링하는 컴포넌트
 * - 모달 상태 및 콜백을 중앙에서 관리
 */
export const MapRouteModals = ({
  isAlbumDeleteOpen,
  isAlbumDeleting,
  onAlbumDeleteClose,
  onAlbumDeleteConfirm,
  isAlbumRenameOpen,
  isAlbumRenaming,
  albumName,
  onAlbumNameChange,
  onAlbumRenameClose,
  onAlbumRenameConfirm,
  isAlbumAddOpen,
  isAlbumAdding,
  newAlbumName,
  onNewAlbumNameChange,
  onAlbumAddClose,
  onAlbumAddConfirm,
}: MapRouteModalsProps) => {
  return (
    <>
      <AlbumDeleteModal
        isOpen={isAlbumDeleteOpen}
        isDeleting={isAlbumDeleting}
        onClose={onAlbumDeleteClose}
        onConfirm={onAlbumDeleteConfirm}
      />
      <AlbumRenameModal
        isOpen={isAlbumRenameOpen}
        isUpdating={isAlbumRenaming}
        albumName={albumName}
        onChangeAlbumName={onAlbumNameChange}
        onClose={onAlbumRenameClose}
        onConfirm={onAlbumRenameConfirm}
      />
      <AlbumAddModal
        isOpen={isAlbumAddOpen}
        isCreating={isAlbumAdding}
        albumName={newAlbumName}
        onChangeAlbumName={onNewAlbumNameChange}
        onClose={onAlbumAddClose}
        onConfirm={onAlbumAddConfirm}
      />
    </>
  );
};
