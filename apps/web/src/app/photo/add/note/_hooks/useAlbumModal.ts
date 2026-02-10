'use client';

import { useGetSelectableAlbums, type SelectableAlbum } from '@repo/api-client';
import { useEffect, useMemo, useState } from 'react';
import { usePhotoContext, type PhotoNoteState } from '@/app/photo/_contexts/PhotoContext';
import { STATE_SOURCE, type StateSource } from '@/app/photo/_constants/stateSource';

type SelectedAlbum = PhotoNoteState['selectedAlbum'];

interface UseAlbumModalOptions {
  /** 상태 소스: 사진 추가(NOTE) 또는 사진 수정(EDIT) */
  stateSource?: StateSource;
}

const useAlbumModal = (options?: UseAlbumModalOptions) => {
  const stateSource = options?.stateSource ?? STATE_SOURCE.NOTE;
  const {
    initialAlbumId,
    setInitialAlbumId,
    photoNoteState,
    updatePhotoNoteState,
    photoEditState,
    updatePhotoEditState,
  } = usePhotoContext();

  const state = stateSource === STATE_SOURCE.EDIT ? photoEditState : photoNoteState;
  const updateState =
    stateSource === STATE_SOURCE.EDIT ? updatePhotoEditState : updatePhotoNoteState;

  const [tempSelectedAlbumId, setTempSelectedAlbumId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetSelectableAlbums();

  // 앨범 상세에서 진입 시 앨범 자동 선택 (note 모드에서만)
  // initialAlbumId 사용 후 바로 null로 설정하여 중복 실행 방지
  useEffect(() => {
    if (stateSource === STATE_SOURCE.NOTE && initialAlbumId && data?.albums) {
      const album = data.albums.find((a) => a.id === initialAlbumId);
      if (album && album.id && album.title) {
        updatePhotoNoteState({ selectedAlbum: { id: album.id, title: album.title } });
      }
      setInitialAlbumId(null);
    }
  }, [
    stateSource,
    initialAlbumId,
    data?.albums,
    setInitialAlbumId,
    updatePhotoNoteState,
  ]);

  const trimmedSearchQuery = searchQuery.trim();

  const filteredAlbums = useMemo<SelectableAlbum[]>(
    () =>
      (data?.albums ?? []).filter((album) =>
        trimmedSearchQuery.length > 0
          ? album.title?.toLowerCase().includes(trimmedSearchQuery.toLowerCase())
          : true,
      ),
    [data?.albums, trimmedSearchQuery],
  );

  const openModal = () => {
    setTempSelectedAlbumId(state.selectedAlbum?.id ?? null);
    setSearchQuery('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetAlbum = () => {
    updateState({ selectedAlbum: null });
  };

  const submitAlbum = () => {
    if (tempSelectedAlbumId && data?.albums) {
      const album = data.albums.find((a) => a.id === tempSelectedAlbumId);
      if (album && album.id && album.title) {
        updateState({ selectedAlbum: { id: album.id, title: album.title } });
      }
    }
    closeModal();
  };

  return {
    selectedAlbum: state.selectedAlbum,
    tempSelectedAlbumId,
    setTempSelectedAlbumId,
    searchQuery,
    setSearchQuery,
    albums: filteredAlbums,
    isLoading,
    isOpen,
    openModal,
    closeModal,
    resetAlbum,
    submitAlbum,
  };
};

export default useAlbumModal;
