'use client';

import { useCallback, useRef, useState } from 'react';
import type { SelectedPhoto } from '../_types/photo';
import { fileToSelectedPhoto } from '../_utils/fileToSelectedPhoto';
import { ALLOWED_IMAGE_MIME_TYPES, isAllowedImageType } from '@/constants/image';

interface UsePhotoSelectOptions {
  onPhotosSelected?: (photos: SelectedPhoto[]) => void;
}

interface UsePhotoSelectReturn {
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 파일 선택으로 사진 추가 */
  selectPhotosFromFile: () => void;
}

export const usePhotoSelect = (options?: UsePhotoSelectOptions): UsePhotoSelectReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const selectPhotosFromFile = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ALLOWED_IMAGE_MIME_TYPES.join(',');
    input.multiple = false;
    input.style.display = 'none';
    document.body.appendChild(input);

    const cleanup = () => {
      document.body.removeChild(input);
    };

    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) {
        cleanup();
        return;
      }

      setIsLoading(true);
      try {
        const validFiles = Array.from(files).filter(isAllowedImageType);
        const photoPromises = validFiles.map((file) => fileToSelectedPhoto(file));
        const results = await Promise.all(photoPromises);
        const newPhotos = results.filter(
          (photo): photo is SelectedPhoto => photo !== null,
        );

        optionsRef.current?.onPhotosSelected?.(newPhotos);
      } finally {
        setIsLoading(false);
        cleanup();
      }
    };

    input.oncancel = cleanup;

    input.click();
  }, []);

  return {
    isLoading,
    selectPhotosFromFile,
  };
};
