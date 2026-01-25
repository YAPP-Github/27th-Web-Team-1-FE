'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { SelectedPhoto } from '../add/_types/photo';

export interface PhotoRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * TODO: 기능이 복잡해지면 PhotoAnimationContext로 분리 고려
 * - selectedPhotoRect, setSelectedPhotoRect는 UI 애니메이션 전용 상태
 * - 현재는 데이터 상태(photos, selectedPhoto)와 UI 상태가 혼재됨
 * - 불필요한 리렌더링 방지를 위해 데이터/UI 상태 분리 권장
 */
interface PhotoContextValue {
  /** 불러온 사진 목록 */
  photos: SelectedPhoto[];
  /** 사진 목록에 추가 */
  addPhotos: (photos: SelectedPhoto[]) => void;
  /** 선택한 사진 */
  selectedPhoto: SelectedPhoto | null;
  /** 사진 선택 */
  setSelectedPhoto: (photo: SelectedPhoto | null) => void;
  /** 선택한 사진의 위치 정보 (애니메이션용) - UI 상태 */
  selectedPhotoRect: PhotoRect | null;
  /** 선택한 사진 위치 설정 - UI 상태 */
  setSelectedPhotoRect: (rect: PhotoRect | null) => void;
}

const PhotoContext = createContext<PhotoContextValue | null>(null);

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);
  const [selectedPhotoRect, setSelectedPhotoRect] = useState<PhotoRect | null>(null);

  const addPhotos = useCallback((newPhotos: SelectedPhoto[]) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
  }, []);

  const value = useMemo(
    () => ({
      photos,
      addPhotos,
      selectedPhoto,
      setSelectedPhoto,
      selectedPhotoRect,
      setSelectedPhotoRect,
    }),
    [photos, addPhotos, selectedPhoto, selectedPhotoRect],
  );

  return <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>;
}

export function usePhotoContext() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within PhotoProvider');
  }
  return context;
}
