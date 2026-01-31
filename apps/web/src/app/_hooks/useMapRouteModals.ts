'use client';

import useDeleteAlbum from './useDeleteAlbum';
import useAlbumRename from './useAlbumRename';
import useAlbumAdd from './useAlbumAdd';

interface UseMapRouteModalsReturn {
  // 앨범 삭제 모달
  isAlbumDeleteOpen: boolean;
  isAlbumDeleting: boolean;
  openAlbumDeleteModal: () => void;
  closeAlbumDeleteModal: () => void;
  confirmAlbumDelete: (albumId: number) => void;

  // 앨범 이름 변경 모달
  isAlbumRenameOpen: boolean;
  isAlbumRenaming: boolean;
  albumName: string;
  setAlbumName: (name: string) => void;
  openAlbumRenameModal: (currentName: string) => void;
  closeAlbumRenameModal: () => void;
  confirmAlbumRename: (albumId: number) => void;

  // 앨범 추가 모달
  isAlbumAddOpen: boolean;
  isAlbumAdding: boolean;
  newAlbumName: string;
  setNewAlbumName: (name: string) => void;
  openAlbumAddModal: () => void;
  closeAlbumAddModal: () => void;
  confirmAlbumAdd: () => void;
}

/**
 * 앨범 관련 모달(삭제, 이름변경, 추가)의 상태를 통합 관리하는 커스텀 훅
 * - useDeleteAlbum, useAlbumRename, useAlbumAdd 로직을 한 곳에서 관리
 * - 모달 오픈/클로즈, 로딩 상태, 데이터 처리를 통합 제공
 */
export const useMapRouteModals = (): UseMapRouteModalsReturn => {
  const {
    isModalOpen: isAlbumDeleteOpen,
    isDeleting: isAlbumDeleting,
    openDeleteModal: openAlbumDeleteModal,
    closeDeleteModal: closeAlbumDeleteModal,
    confirmDelete: confirmAlbumDelete,
  } = useDeleteAlbum();

  const {
    isModalOpen: isAlbumRenameOpen,
    isUpdating: isAlbumRenaming,
    albumName,
    setAlbumName,
    openRenameModal: openAlbumRenameModal,
    closeRenameModal: closeAlbumRenameModal,
    confirmRename: confirmAlbumRename,
  } = useAlbumRename();

  const {
    isModalOpen: isAlbumAddOpen,
    isCreating: isAlbumAdding,
    albumName: newAlbumName,
    setAlbumName: setNewAlbumName,
    openAddModal: openAlbumAddModal,
    closeAddModal: closeAlbumAddModal,
    confirmAdd: confirmAlbumAdd,
  } = useAlbumAdd();

  return {
    isAlbumDeleteOpen,
    isAlbumDeleting,
    openAlbumDeleteModal,
    closeAlbumDeleteModal,
    confirmAlbumDelete,
    isAlbumRenameOpen,
    isAlbumRenaming,
    albumName,
    setAlbumName,
    openAlbumRenameModal,
    closeAlbumRenameModal,
    confirmAlbumRename,
    isAlbumAddOpen,
    isAlbumAdding,
    newAlbumName,
    setNewAlbumName,
    openAlbumAddModal,
    closeAlbumAddModal,
    confirmAlbumAdd,
  };
};
