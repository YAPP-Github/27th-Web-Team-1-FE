'use client';

import { useMemo, useState } from 'react';
import { useGetSelectableAlbums } from '@repo/api-client';

// TODO: 사용자 컨텍스트에서 가져오도록 수정
const TEMP_USER_ID = 1;

interface SelectedAlbum {
  id: number;
  title: string;
}

const useAlbumModal = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(null);
  const [tempSelectedAlbumId, setTempSelectedAlbumId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetSelectableAlbums({ userId: TEMP_USER_ID });

  const filteredAlbums = useMemo(
    () =>
      (data?.albums ?? [])
        .filter((album): album is typeof album & { id: number; title: string } =>
          album.id !== undefined && album.title !== undefined
        )
        .filter((album) =>
          searchQuery
            ? album.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        )
        .map((album) => ({
          id: String(album.id),
          title: album.title,
          thumbnail: album.thumbnailUrl ?? '',
          photoCount: album.photoCount ?? 0,
        })),
    [data?.albums, searchQuery]
  );

  const openModal = () => {
    setTempSelectedAlbumId(selectedAlbum?.id ? String(selectedAlbum.id) : null);
    setSearchQuery('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitAlbum = () => {
    if (tempSelectedAlbumId && data?.albums) {
      const album = data.albums.find((a) => String(a.id) === tempSelectedAlbumId);
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
