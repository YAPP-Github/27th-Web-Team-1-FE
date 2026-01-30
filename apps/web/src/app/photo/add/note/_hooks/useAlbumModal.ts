'use client';

import { useGetSelectableAlbums, type SelectableAlbum } from '@repo/api-client';
import { useMemo, useState } from 'react';

interface SelectedAlbum {
  id: number;
  title: string;
}

const useAlbumModal = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(null);
  const [tempSelectedAlbumId, setTempSelectedAlbumId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetSelectableAlbums();

  // TODO: 앨범 상세에서 진입 시 또는 수정 화면에서 기존 앨범 자동 선택

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
    submitAlbum,
  };
};

export default useAlbumModal;
