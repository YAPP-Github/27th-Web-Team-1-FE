'use client';

import { useCallback, useState } from 'react';
import type { SelectedPhoto } from '../_types/photo';
import { fileToSelectedPhoto } from '../_utils/fileToSelectedPhoto';

interface UsePhotoSelectOptions {
  onPhotosSelected?: (photos: SelectedPhoto[]) => void;
}

interface UsePhotoSelectReturn {
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 파일 선택으로 사진 추가 */
  selectPhotosFromFile: () => Promise<void>;
}

export const usePhotoSelect = (options?: UsePhotoSelectOptions): UsePhotoSelectReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const selectPhotosFromFile = useCallback(async () => {
    return new Promise<void>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;

      input.onchange = async (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (!files || files.length === 0) {
          resolve();
          return;
        }

        setIsLoading(true);
        const photoPromises = Array.from(files).map((file) => fileToSelectedPhoto(file));
        const results = await Promise.all(photoPromises);
        const newPhotos = results.filter(
          (photo): photo is SelectedPhoto => photo !== null,
        );

        options?.onPhotosSelected?.(newPhotos);
        setIsLoading(false);
        resolve();
      };

      input.oncancel = () => resolve();
      input.click();
    });
  }, [options]);

  return {
    isLoading,
    selectPhotosFromFile,
  };
};
