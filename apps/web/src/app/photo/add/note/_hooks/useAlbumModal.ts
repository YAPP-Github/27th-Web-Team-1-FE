'use client';

import { useGetSelectableAlbums, type SelectableAlbum } from '@repo/api-client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePhotoContext } from '@/app/photo/_contexts/PhotoContext';

interface SelectedAlbum {
  id: number;
  title: string;
}

const useAlbumModal = () => {
  const { initialAlbumId, setInitialAlbumId } = usePhotoContext();
  const hasInitialized = useRef(false);

  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(null);
  const [tempSelectedAlbumId, setTempSelectedAlbumId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetSelectableAlbums();

  // 앨범 상세에서 진입 시 앨범 자동 선택 (최초 1회만)
  useEffect(() => {
    if (initialAlbumId && data?.albums && !hasInitialized.current) {
      const album = data.albums.find((a) => a.id === initialAlbumId);
      if (album && album.id && album.title) {
        setSelectedAlbum({ id: album.id, title: album.title });
        hasInitialized.current = true;
        setInitialAlbumId(null);
      }
    }
  }, [initialAlbumId, data?.albums, setInitialAlbumId]);

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
    setTempSelectedAlbumId(selectedAlbum?.id ?? null);
    setSearchQuery('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetAlbum = () => {
    setSelectedAlbum(null);
  };

  const submitAlbum = () => {
    if (tempSelectedAlbumId && data?.albums) {
      const album = data.albums.find((a) => a.id === tempSelectedAlbumId);
      if (album && album.id && album.title) {
        setSelectedAlbum({ id: album.id, title: album.title });
      }
    }
    closeModal();
  };

  return {
    selectedAlbum,
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
