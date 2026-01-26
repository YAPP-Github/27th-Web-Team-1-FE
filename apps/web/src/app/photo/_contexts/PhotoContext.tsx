'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { SelectedPhoto } from '../add/_types/photo';

interface PhotoContextValue {
  /** 불러온 사진 목록 */
  photos: SelectedPhoto[];
  /** 사진 목록에 추가 */
  addPhotos: (photos: SelectedPhoto[]) => void;
  /** 선택한 사진 */
  selectedPhoto: SelectedPhoto | null;
  /** 사진 선택 */
  setSelectedPhoto: (photo: SelectedPhoto | null) => void;
}

const PhotoContext = createContext<PhotoContextValue | null>(null);

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);

  const addPhotos = useCallback((newPhotos: SelectedPhoto[]) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
  }, []);

  const value = useMemo(
    () => ({ photos, addPhotos, selectedPhoto, setSelectedPhoto }),
    [photos, addPhotos, selectedPhoto],
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
