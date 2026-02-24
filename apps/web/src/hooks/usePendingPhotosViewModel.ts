'use client';

import { usePendingPhotos } from '@/stores/pendingPhotos/PendingPhotosContext';
import { DISPLAY_PHOTO_KIND, type DisplayPhoto } from '@/stores/pendingPhotos/types';
import { processPhotosWithDateDisplay } from '@/utils/photoGrid';
import type {
  AlbumThumbnails,
  AlbumWithPhotosResponse,
  PhotoDetailResponse,
  PhotoResponse,
} from '@repo/api-client';
import { useEffect, useMemo, useState, useRef } from 'react';

/**
 * Pending 사진과 서버 데이터를 merge하는 뷰 모델 훅
 *
 * - 앨범 리스트: pending 사진의 썸네일/카운트를 반영
 * - 앨범 상세: pending 사진을 목록 앞에 삽입하여 DisplayPhoto[] 반환
 * - 사진 상세 연동: activePendingId 관리
 */
export const usePendingPhotosViewModel = (
  rawAlbumList: AlbumThumbnails[],
  albumDetail?: AlbumWithPhotosResponse | null,
) => {
  const {
    pendingPhotos,
    removePendingPhoto,
    getPendingPhotosByAlbum,
    activePendingId,
    setActivePendingId,
  } = usePendingPhotos();

  // 앨범 리스트에 pending 썸네일 + 카운트 merge
  const albumList = useMemo(() => {
    const uploading = pendingPhotos.filter((p) => p.albumId && p.status !== 'success');
    if (uploading.length === 0) return rawAlbumList;

    return rawAlbumList.map((album) => {
      const albumPending = uploading.filter((p) => p.albumId === album.id);
      if (albumPending.length === 0) return album;

      const pendingThumbnails = albumPending.map((p) => p.photo.uri);
      return {
        ...album,
        photoCount: (album.photoCount ?? 0) + albumPending.length,
        thumbnailUrls: [...pendingThumbnails, ...(album.thumbnailUrls ?? [])].slice(0, 4),
      };
    });
  }, [rawAlbumList, pendingPhotos]);

  // 앨범 상세 사진 목록에 pending 사진 merge
  const displayPhotos: DisplayPhoto[] = useMemo(() => {
    const pending: DisplayPhoto[] = albumDetail?.id
      ? getPendingPhotosByAlbum(albumDetail.id).map((p) => ({
          kind: DISPLAY_PHOTO_KIND.PENDING,
          pendingId: p.pendingId,
          status: p.status,
          progress: p.progress,
          url: p.photo.uri,
          takenAt: p.photo.createdAt,
          description: p.description,
          showDate: false,
          serverId: p.serverId,
        }))
      : [];

    const server: DisplayPhoto[] = albumDetail?.photos
      ? processPhotosWithDateDisplay(albumDetail.photos).map((photo) => ({
          ...photo,
          kind: DISPLAY_PHOTO_KIND.SERVER,
        }))
      : [];

    return [...pending, ...server];
  }, [albumDetail, getPendingPhotosByAlbum]);

  return {
    albumList,
    displayPhotos,
    activePendingId,
    setActivePendingId,
    removePendingPhoto,
  };
};

/**
 * 사진 상세 페이지에서 pending vs server 표시 데이터를 결정하는 뷰 모델 훅
 *
 * - pending 모드: activePendingId 기반으로 로컬 데이터 표시
 * - 업로드 완료 시: URL 조용히 갱신 → 서버 데이터로 전환 (리마운트 없음)
 * - resolveDisplayData()로 서버 데이터와 merge된 최종 표시 데이터 반환
 */
export const usePendingPhotoDetail = ({
  photoId,
  albumIdFromQuery,
}: {
  photoId: number;
  albumIdFromQuery?: number;
}) => {
  const { pendingPhotos, removePendingPhoto, activePendingId, setActivePendingId } =
    usePendingPhotos();

  const pendingPhoto = activePendingId
    ? pendingPhotos.find((p) => p.pendingId === activePendingId)
    : undefined;

  // 업로드 완료 후 서버 ID를 받으면 서버 모드로 전환할 때 사용
  const [resolvedServerId, setResolvedServerId] = useState<number | null>(null);

  // pending 모드: activePendingId가 있고 아직 서버 ID로 전환하지 않은 상태
  const isPendingMode = !!activePendingId && resolvedServerId === null;
  const effectivePhotoId = resolvedServerId ?? photoId;

  // 업로드 완료 감지: 서버 ID 전환 (렌더 중 상태 조정 패턴)
  if (
    pendingPhoto?.status === 'success' &&
    pendingPhoto.serverId &&
    resolvedServerId === null
  ) {
    setResolvedServerId(pendingPhoto.serverId);
  }

  // 서버 ID 확정 시 URL 갱신 (side effect)
  const prevResolvedServerIdRef = useRef(resolvedServerId);
  useEffect(() => {
    if (
      resolvedServerId !== null &&
      prevResolvedServerIdRef.current !== resolvedServerId
    ) {
      prevResolvedServerIdRef.current = resolvedServerId;
      const newUrl = `/photo/${resolvedServerId}${albumIdFromQuery ? `?albumId=${albumIdFromQuery}` : ''}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [resolvedServerId, albumIdFromQuery]);

  const isUploading = pendingPhoto?.status === 'uploading';
  const isError = pendingPhoto?.status === 'error';

  /**
   * 서버 데이터를 받아 pending/server 통합된 표시용 데이터를 반환
   * 렌더 시점에 호출하여 사용
   *
   * - pending 모드: pending 데이터 표시
   * - 전환 중 (서버 데이터 미로드): pending 데이터 유지 → 깜빡임 방지
   * - 서버 데이터 로드 완료: 서버 데이터로 교체
   */
  const resolveDisplayData = (serverData: {
    photoDetail?: PhotoResponse | PhotoDetailResponse;
    currentPhoto?: PhotoResponse | null;
    displayPhotoDetail?: PhotoDetailResponse;
  }) => {
    const { photoDetail, currentPhoto, displayPhotoDetail } = serverData;
    const hasServerData = !!displayPhotoDetail || !!photoDetail;

    // 서버 데이터가 아직 없으면 pending 데이터를 계속 표시
    if (isPendingMode || (!hasServerData && pendingPhoto)) {
      return {
        photoUrl: pendingPhoto?.photo.uri,
        description: pendingPhoto?.description,
        takenAt: pendingPhoto?.photo.createdAt,
        detail: undefined as PhotoDetailResponse | undefined,
        displayPhotoId: pendingPhoto?.serverId ?? 0,
      };
    }

    return {
      photoUrl: (currentPhoto ?? photoDetail)?.url,
      description: displayPhotoDetail?.description,
      takenAt: displayPhotoDetail?.takenAt,
      detail: displayPhotoDetail,
      displayPhotoId: (currentPhoto ?? photoDetail)?.id ?? effectivePhotoId,
    };
  };

  return {
    isPendingMode,
    pendingPhoto,
    effectivePhotoId,
    resolvedServerId,
    isUploading,
    isError,
    activePendingId,
    setActivePendingId,
    removePendingPhoto,
    resolveDisplayData,
  };
};
