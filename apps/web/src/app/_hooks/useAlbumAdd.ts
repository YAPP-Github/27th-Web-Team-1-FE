'use client';

import { useState } from 'react';
import { useCreate2, getGetSelectableAlbumsQueryKey } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';

const useAlbumAdd = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [albumName, setAlbumName] = useState('');

  const { mutate: create, isPending: isCreating } = useCreate2();

  const confirmAdd = () => {
    const nextTitle = albumName.trim();
    if (!nextTitle) return;

    create(
      { data: { title: nextTitle, workspaceId: 1 } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSelectableAlbumsQueryKey() });
          showToast('앨범이 생성되었어요');
          onSuccess?.();
        },
        onError: () => {
          showToast('앨범 생성에 실패했어요');
        },
      },
    );
  };

  return {
    isCreating,
    albumName,
    setAlbumName,
    confirmAdd,
  };
};

export default useAlbumAdd;
