'use client';

import type { PhotoLocation, SelectedPhoto } from '@/app/photo/add/_types/photo';
import { useToast } from '@/components/toast';
import { getMapMeAlbumsQueryKey } from '@/hooks/queries/useMapMeAlbums';
import {
  create,
  getGetMapMeQueryKey,
  getGetPhotosQueryKey,
  getPresignedUrl,
} from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import type { PendingPhoto } from './types';

interface AddPendingPhotoParams {
  photo: SelectedPhoto;
  albumId?: number;
  description?: string;
  location?: PhotoLocation;
}

interface PendingPhotosContextValue {
  pendingPhotos: PendingPhoto[];
  addPendingPhoto: (params: AddPendingPhotoParams) => void;
  removePendingPhoto: (pendingId: string) => void;
  getPendingPhotosByAlbum: (albumId: number) => PendingPhoto[];
  /** 사진 상세 화면에서 보고 있는 pending photo ID */
  activePendingId: string | null;
  setActivePendingId: (id: string | null) => void;
}

const PendingPhotosContext = createContext<PendingPhotosContextValue | null>(null);

/** Data URL을 Blob으로 변환 */
const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
  const response = await fetch(dataUrl);
  return response.blob();
};

/** XHR로 S3 업로드 (진행률 추적) */
const uploadToS3WithProgress = (
  presignedUrl: string,
  blob: Blob,
  contentType: string,
  onProgress: (percent: number) => void,
  signal: AbortSignal,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const handleAbort = () => {
      xhr.abort();
      reject(new DOMException('Upload aborted', 'AbortError'));
    };
    signal.addEventListener('abort', handleAbort);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        // S3 업로드 구간: 5% ~ 90%
        const ratio = e.loaded / e.total;
        onProgress(5 + ratio * 85);
      }
    };

    xhr.onload = () => {
      signal.removeEventListener('abort', handleAbort);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`S3 upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      signal.removeEventListener('abort', handleAbort);
      reject(new Error('S3 upload network error'));
    };

    xhr.open('PUT', presignedUrl);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.send(blob);
  });

export function PendingPhotosProvider({ children }: PropsWithChildren) {
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [activePendingId, setActivePendingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const pendingPhotosRef = useRef(pendingPhotos);
  pendingPhotosRef.current = pendingPhotos;

  const updatePending = useCallback((pendingId: string, patch: Partial<PendingPhoto>) => {
    setPendingPhotos((prev) =>
      prev.map((p) => (p.pendingId === pendingId ? { ...p, ...patch } : p)),
    );
  }, []);

  const removePendingPhoto = useCallback((pendingId: string) => {
    const item = pendingPhotosRef.current.find((p) => p.pendingId === pendingId);
    if (item?.abortController) {
      item.abortController.abort();
    }
    setPendingPhotos((prev) => prev.filter((p) => p.pendingId !== pendingId));
  }, []);

  const addPendingPhoto = useCallback(
    (params: AddPendingPhotoParams) => {
      const { photo, albumId, description, location } = params;
      const pendingId = `pending-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const abortController = new AbortController();

      const pending: PendingPhoto = {
        pendingId,
        status: 'uploading',
        progress: 0,
        photo,
        albumId,
        description,
        location,
        abortController,
      };

      setPendingPhotos((prev) => [pending, ...prev]);

      // 비동기 업로드 파이프라인 시작
      (async () => {
        try {
          const blob = await dataUrlToBlob(photo.uri);
          const contentType = blob.type || 'image/jpeg';

          // 1. Presigned URL 발급 (0% → 5%)
          const presigned = await getPresignedUrl(
            { fileName: photo.filename, contentType },
            abortController.signal,
          );

          if (!presigned.presignedUrl || !presigned.objectUrl) {
            throw new Error('Failed to get presigned URL');
          }

          updatePending(pendingId, { progress: 5 });

          // 2. S3 업로드 with XHR progress (5% → 90%)
          await uploadToS3WithProgress(
            presigned.presignedUrl,
            blob,
            contentType,
            (percent) => updatePending(pendingId, { progress: Math.round(percent) }),
            abortController.signal,
          );

          // 3. POST /photos 메타데이터 저장 (90% → 100%)
          updatePending(pendingId, { progress: 90 });

          const finalLocation = location ?? photo.location;
          if (!finalLocation) {
            throw new Error('Location is required');
          }

          const createResponse = await create(
            {
              url: presigned.objectUrl,
              albumId,
              longitude: finalLocation.longitude,
              latitude: finalLocation.latitude,
              takenAt: photo.createdAt,
              description,
            },
            abortController.signal,
          );

          updatePending(pendingId, {
            status: 'success',
            progress: 100,
            serverId: createResponse.id,
          });

          // 성공 시 쿼리 invalidate
          queryClient.invalidateQueries({ queryKey: getGetMapMeQueryKey() });
          queryClient.invalidateQueries({ queryKey: getMapMeAlbumsQueryKey() });
          if (albumId) {
            queryClient.invalidateQueries({
              queryKey: getGetPhotosQueryKey(albumId),
            });
          }

          // 성공 항목은 2초 후 자동 제거
          setTimeout(() => {
            setPendingPhotos((prev) => prev.filter((p) => p.pendingId !== pendingId));
          }, 2000);
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            // 사용자가 취소한 경우 — 이미 removePendingPhoto에서 제거됨
            return;
          }
          updatePending(pendingId, {
            status: 'error',
            errorMessage: error instanceof Error ? error.message : 'Upload failed',
          });
          showToast('사진 업로드에 실패했어요');
        }
      })();
    },
    [queryClient, updatePending, showToast],
  );

  const getPendingPhotosByAlbum = useCallback(
    (albumId: number) =>
      pendingPhotos.filter((p) => p.albumId === albumId && p.status !== 'success'),
    [pendingPhotos],
  );

  const value = useMemo(
    () => ({
      pendingPhotos,
      addPendingPhoto,
      removePendingPhoto,
      getPendingPhotosByAlbum,
      activePendingId,
      setActivePendingId,
    }),
    [
      pendingPhotos,
      addPendingPhoto,
      removePendingPhoto,
      getPendingPhotosByAlbum,
      activePendingId,
    ],
  );

  return (
    <PendingPhotosContext.Provider value={value}>
      {children}
    </PendingPhotosContext.Provider>
  );
}

export const usePendingPhotos = () => {
  const context = useContext(PendingPhotosContext);
  if (!context) {
    throw new Error('usePendingPhotos must be used within PendingPhotosProvider');
  }
  return context;
};
