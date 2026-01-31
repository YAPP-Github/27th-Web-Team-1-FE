'use client';

import { useState } from 'react';
import { useCreate2, getGetSelectableAlbumsQueryKey } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';

const useAlbumAdd = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albumName, setAlbumName] = useState('');

  const { mutate: create, isPending: isCreating } = useCreate2();

  const openAddModal = () => {
    setAlbumName('');
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };

  const confirmAdd = () => {
    const nextTitle = albumName.trim();
    if (!nextTitle) return;

    create(
      { data: { title: nextTitle } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSelectableAlbumsQueryKey() });
          showToast('앨범이 생성되었어요');
          closeAddModal();
        },
        onError: () => {
          showToast('앨범 생성에 실패했어요');
        },
      },
    );
  };

  return {
    isModalOpen,
    isCreating,
    albumName,
    setAlbumName,
    openAddModal,
    closeAddModal,
    confirmAdd,
  };
};

export default useAlbumAdd;
