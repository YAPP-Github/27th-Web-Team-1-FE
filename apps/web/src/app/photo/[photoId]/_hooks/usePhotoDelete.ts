import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  useDelete,
  getGetPhotosQueryKey,
  getGetMapMeQueryKey,
  type AlbumThumbnails,
  type PhotoListResponse,
} from '@repo/api-client';
import { getMapMeAlbumsQueryKey } from '@/hooks/queries/useMapMeAlbums';
import { useToast } from '@/components/toast/ToastProvider';

interface ConfirmDeleteParams {
  photoId: number;
  albumId?: number;
}

const usePhotoDelete = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: deletePhotoAsync, isPending: isDeleting } = useDelete();

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async ({ photoId, albumId }: ConfirmDeleteParams) => {
    // 낙관적 업데이트를 위한 이전 데이터 스냅샷
    const previousAlbums = queryClient.getQueryData<AlbumThumbnails[]>(
      getMapMeAlbumsQueryKey(),
    );
    const previousPhotos = albumId
      ? queryClient.getQueryData<PhotoListResponse>(getGetPhotosQueryKey(albumId))
      : undefined;

    // 앨범 사진 목록에서 낙관적으로 제거
    if (albumId) {
      queryClient.setQueryData<PhotoListResponse>(
        getGetPhotosQueryKey(albumId),
        (old) => {
          if (!old?.albums?.length) return old;
          return {
            ...old,
            albums: old.albums.map((album) =>
              album.id === albumId
                ? {
                    ...album,
                    photoCount: Math.max((album.photoCount ?? 0) - 1, 0),
                    photos: (album.photos ?? []).filter((p) => p.id !== photoId),
                  }
                : album,
            ),
          };
        },
      );
    }

    // 앨범 썸네일 목록 낙관적 업데이트 (photoCount만 갱신, thumbnailUrls는 invalidate로 동기화)
    if (albumId) {
      queryClient.setQueryData<AlbumThumbnails[]>(getMapMeAlbumsQueryKey(), (old) => {
        if (!old) return old;
        return old.map((album) =>
          album.id === albumId
            ? {
                ...album,
                photoCount: Math.max((album.photoCount ?? 0) - 1, 0),
              }
            : album,
        );
      });
    }

    // 낙관적 업데이트: 삭제 완료를 기다리지 않고 즉시 이동
    showToast('사진이 삭제되었습니다');
    closeDeleteModal();
    router.back();

    try {
      await deletePhotoAsync({ id: photoId });
      queryClient.invalidateQueries({ queryKey: getGetMapMeQueryKey() });
      queryClient.invalidateQueries({ queryKey: getMapMeAlbumsQueryKey() });
      if (albumId) {
        queryClient.invalidateQueries({ queryKey: getGetPhotosQueryKey(albumId) });
      }
    } catch {
      if (previousAlbums !== undefined) {
        queryClient.setQueryData(getMapMeAlbumsQueryKey(), previousAlbums);
      }
      if (albumId && previousPhotos !== undefined) {
        queryClient.setQueryData(getGetPhotosQueryKey(albumId), previousPhotos);
      }
      showToast('삭제에 실패했습니다. 다시 시도해주세요');
    }
  };

  return {
    isModalOpen,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default usePhotoDelete;
