import type { PhotoResponse } from '@repo/api-client';
import type { SelectedPhoto, PhotoLocation } from '@/app/photo/add/_types/photo';

export type PendingPhotoStatus = 'uploading' | 'success' | 'error';

export interface PendingPhoto {
  pendingId: string;
  status: PendingPhotoStatus;
  /** 0 ~ 100 */
  progress: number;
  photo: SelectedPhoto;
  albumId?: number;
  description?: string;
  location?: PhotoLocation;
  /** 업로드 성공 시 서버에서 반환된 사진 ID */
  serverId?: number;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 업로드 취소를 위한 AbortController */
  abortController?: AbortController;
}

export const DISPLAY_PHOTO_KIND = {
  SERVER: 'server',
  PENDING: 'pending',
} as const;

/** 서버에서 받은 확정된 사진 */
interface ServerPhoto extends PhotoResponse {
  kind: typeof DISPLAY_PHOTO_KIND.SERVER;
  showDate: boolean;
}

/** 업로드 중인 pending 사진 */
interface PendingDisplayPhoto {
  kind: typeof DISPLAY_PHOTO_KIND.PENDING;
  pendingId: string;
  status: PendingPhotoStatus;
  progress: number;
  /** 로컬 data URL */
  url: string;
  takenAt?: string;
  description?: string;
  showDate: boolean;
  /** 업로드 완료 시 서버 사진 ID */
  serverId?: number;
}

export type DisplayPhoto = ServerPhoto | PendingDisplayPhoto;
