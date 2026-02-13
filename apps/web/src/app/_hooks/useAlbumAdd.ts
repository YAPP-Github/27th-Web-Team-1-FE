'use client';

import { useState } from 'react';
import { ApiError, useCreate2 } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';
import { getMapMeAlbumsQueryKey } from '@/hooks/queries/useMapMeAlbums';

const useAlbumAdd = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [albumName, setAlbumName] = useState('');

  const { mutate: create, isPending: isCreating } = useCreate2();

  const confirmAdd = () => {
    const nextTitle = albumName.trim();
    if (!nextTitle) return;

    create(
      { data: { title: nextTitle } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getMapMeAlbumsQueryKey() });
          queryClient.refetchQueries({ queryKey: getMapMeAlbumsQueryKey() });
          showToast('앨범이 생성되었어요');
          onSuccess?.();
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            if (error?.code === 409 || error?.data?.errorCode === 'ALBUM_003') {
              showToast('존재하는 앨범명이에요');
            } else {
              showToast('앨범 생성에 실패했어요');
            }
          }
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
