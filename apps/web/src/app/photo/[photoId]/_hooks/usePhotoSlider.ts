import { useCallback, useEffect, useRef, useState } from 'react';
import type { PhotoResponse } from '@repo/api-client';

const THUMBNAIL_WIDTH = 40;
const ACTIVE_THUMBNAIL_WIDTH = 56;
const GAP = 8;

interface UsePhotoSliderProps {
  photos: PhotoResponse[];
  initialPhotoId?: number;
  albumIdFromQuery?: number;
  clusterIdFromQuery?: string;
}

const usePhotoSlider = ({
  photos,
  initialPhotoId,
  albumIdFromQuery,
  clusterIdFromQuery,
}: UsePhotoSliderProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const updateUrl = useCallback(
    (photoId: number) => {
      let url = `/photo/${photoId}`;
      if (albumIdFromQuery) {
        url += `?albumId=${albumIdFromQuery}`;
      } else if (clusterIdFromQuery) {
        url += `?clusterId=${clusterIdFromQuery}`;
      }
      window.history.replaceState(null, '', url);
    },
    [albumIdFromQuery, clusterIdFromQuery],
  );

  useEffect(() => {
    if (photos.length > 0 && initialPhotoId) {
      const index = photos.findIndex((p) => p.id === initialPhotoId);
      if (index !== -1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- 외부 데이터(photos) 로드 완료 시 인덱스 동기화
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
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
      const newPhoto = photos[newIndex];
      if (newPhoto?.id !== undefined) {
        updateUrl(newPhoto.id);
      }
    }
  }, [photos, currentPhotoIndex, updateUrl]);

  const handleNextPhoto = useCallback(() => {
    if (photos.length > 0 && currentPhotoIndex < photos.length - 1) {
      const newIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(newIndex);
      const newPhoto = photos[newIndex];
      if (newPhoto?.id !== undefined) {
        updateUrl(newPhoto.id);
      }
    }
  }, [photos, currentPhotoIndex, updateUrl]);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      setCurrentPhotoIndex(index);
      const newPhoto = photos[index];
      if (newPhoto?.id !== undefined) {
        updateUrl(newPhoto.id);
      }
    },
    [photos, updateUrl],
  );

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
