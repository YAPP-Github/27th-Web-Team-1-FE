'use client';

import { useGetSelectableAlbums } from '@repo/api-client';
import { useMemo, useState } from 'react';

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

  // TODO: 앨범 상세에서 진입 시 또는 수정 화면에서 기존 앨범 자동 선택

  const trimmedSearchQuery = searchQuery.trim();

  const filteredAlbums = useMemo(
    () =>
      (data?.albums ?? [])
        .filter(
          (album): album is typeof album & { id: number; title: string } =>
            album.id !== undefined && album.title !== undefined,
        )
        .filter((album) =>
          trimmedSearchQuery.length > 0
            ? album.title.toLowerCase().includes(trimmedSearchQuery.toLowerCase())
            : true,
        )
        .map((album) => ({
          id: String(album.id),
          title: album.title,
          thumbnail: album.thumbnailUrls?.[0] ?? '',
          photoCount: album.photoCount ?? 0,
        })),
    [data?.albums, trimmedSearchQuery],
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
