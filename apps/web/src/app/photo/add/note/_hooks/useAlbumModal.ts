'use client';

import { useGetSelectableAlbums, type SelectableAlbum } from '@repo/api-client';
import { useEffect, useMemo, useState } from 'react';
import { usePhotoContext } from '@/app/photo/_contexts/PhotoContext';

const useAlbumModal = () => {
  const { initialAlbumId, setInitialAlbumId, photoNoteState, updatePhotoNoteState } =
    usePhotoContext();

  const [tempSelectedAlbumId, setTempSelectedAlbumId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetSelectableAlbums();

  // 앨범 상세에서 진입 시 앨범 자동 선택
  // initialAlbumId 사용 후 바로 null로 설정하여 중복 실행 방지
  useEffect(() => {
    if (initialAlbumId && data?.albums) {
      const album = data.albums.find((a) => a.id === initialAlbumId);
      if (album && album.id && album.title) {
        updatePhotoNoteState({ selectedAlbum: { id: album.id, title: album.title } });
      }
      setInitialAlbumId(null);
    }
  }, [initialAlbumId, data?.albums, setInitialAlbumId, updatePhotoNoteState]);

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
    setTempSelectedAlbumId(photoNoteState.selectedAlbum?.id ?? null);
    setSearchQuery('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetAlbum = () => {
    updatePhotoNoteState({ selectedAlbum: null });
  };

  const submitAlbum = () => {
    if (tempSelectedAlbumId && data?.albums) {
      const album = data.albums.find((a) => a.id === tempSelectedAlbumId);
      if (album && album.id && album.title) {
        updatePhotoNoteState({ selectedAlbum: { id: album.id, title: album.title } });
      }
    }
    closeModal();
  };

  return {
    selectedAlbum: photoNoteState.selectedAlbum,
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
