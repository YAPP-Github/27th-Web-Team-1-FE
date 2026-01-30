'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { AlbumWithPhotosResponse } from '@repo/api-client';
import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import { processPhotosWithDateDisplay } from '@/utils/photoGrid';
import { ROUTES } from '@/constants/routes';

interface AlbumDetailProps {
  album?: AlbumWithPhotosResponse;
}

const AlbumDetail = ({ album }: AlbumDetailProps) => {
  const router = useRouter();

  const processedPhotos = useMemo(() => {
    if (!album?.photos) return [];
    return processPhotosWithDateDisplay(album.photos);
  }, [album]);

  if (!album) {
    return <div>앨범 정보를 불러올 수 없어요.</div>;
  }

  const handlePhotoClick = (photoId: number) => {
    router.push(ROUTES.PHOTO.VIEW(photoId, album.id));
  };

  return (
    <PhotoGridContainer>
      {processedPhotos.map((photo) => (
        <PhotoGridItem
          key={photo.id}
          src={photo.url ?? ''}
          alt={`${album.title}-${photo.id}`}
          date={photo.showDate ? photo.takenAt : undefined}
          onClick={() => handlePhotoClick(photo.id ?? 0)}
        />
      ))}
    </PhotoGridContainer>
  );
};

export default AlbumDetail;
