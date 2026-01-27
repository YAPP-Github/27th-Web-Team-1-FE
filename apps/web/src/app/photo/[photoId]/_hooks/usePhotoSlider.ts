import { useCallback, useEffect, useRef, useState } from 'react';
import type { PhotoResponse } from '@repo/api-client';

const THUMBNAIL_WIDTH = 40;
const ACTIVE_THUMBNAIL_WIDTH = 56;
const GAP = 8;

interface UsePhotoSliderProps {
  photos: PhotoResponse[];
  initialPhotoId?: number;
}

const usePhotoSlider = ({ photos, initialPhotoId }: UsePhotoSliderProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photos.length > 0 && initialPhotoId) {
      const index = photos.findIndex((p) => p.id === initialPhotoId);
      if (index !== -1) {
        setCurrentPhotoIndex(index);
      }
    }
  }, [photos, initialPhotoId]);

  useEffect(() => {
    if (thumbnailContainerRef.current && photos.length > 0) {
      const container = thumbnailContainerRef.current;
      const containerWidth = container.offsetWidth;
      const scrollPosition =
        currentPhotoIndex * (THUMBNAIL_WIDTH + GAP) -
        containerWidth / 2 +
        ACTIVE_THUMBNAIL_WIDTH / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [currentPhotoIndex, photos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (photos.length > 0 && currentPhotoIndex > 0) {
      setCurrentPhotoIndex((prev) => prev - 1);
    }
  }, [photos.length, currentPhotoIndex]);

  const handleNextPhoto = useCallback(() => {
    if (photos.length > 0 && currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex((prev) => prev + 1);
    }
  }, [photos.length, currentPhotoIndex]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
  }, []);

  const currentPhoto = photos.length > 0 ? photos[currentPhotoIndex] : null;

  return {
    currentPhotoIndex,
    currentPhoto,
    thumbnailContainerRef,
    handlePrevPhoto,
    handleNextPhoto,
    handleThumbnailClick,
  };
};

export default usePhotoSlider;
