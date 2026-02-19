'use client';

import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import { ROUTES } from '@/constants/routes';
import { usePendingPhotos } from '@/stores/pendingPhotos/PendingPhotosContext';
import { DISPLAY_PHOTO_KIND, type DisplayPhoto } from '@/stores/pendingPhotos/types';
import type { AlbumWithPhotosResponse } from '@repo/api-client';
import { useRouter } from 'next/navigation';

interface AlbumDetailProps {
  album?: AlbumWithPhotosResponse;
  displayPhotos: DisplayPhoto[];
}

const AlbumDetail = ({ album, displayPhotos }: AlbumDetailProps) => {
  const router = useRouter();
  const { setActivePendingId } = usePendingPhotos();

  if (!album) {
    return <div>앨범 정보를 불러올 수 없어요.</div>;
  }

  const handlePhotoClick = (photo: DisplayPhoto) => {
    if (photo.kind === DISPLAY_PHOTO_KIND.PENDING) {
      if (photo.serverId) {
        // 업로드 완료된 사진은 서버 ID로 바로 이동
        router.push(ROUTES.PHOTO.VIEW(photo.serverId, album.id));
      } else {
        setActivePendingId(photo.pendingId);
        router.push(ROUTES.PHOTO.VIEW(0, album.id));
      }
    } else {
      router.push(ROUTES.PHOTO.VIEW(photo.id ?? 0, album.id));
    }
  };

  return (
    <PhotoGridContainer>
      {displayPhotos.map((photo) => {
        const key =
          photo.kind === DISPLAY_PHOTO_KIND.PENDING
            ? photo.pendingId
            : `server-${photo.id}`;
        return (
          <PhotoGridItem
            key={key}
            src={
              photo.kind === DISPLAY_PHOTO_KIND.PENDING ? photo.url : (photo.url ?? '')
            }
            alt={
              photo.kind === DISPLAY_PHOTO_KIND.PENDING
                ? 'uploading'
                : `${album.title}-${photo.id}`
            }
            date={photo.showDate ? photo.takenAt : undefined}
            onClick={() => handlePhotoClick(photo)}
            progress={
              photo.kind === DISPLAY_PHOTO_KIND.PENDING && photo.status === 'uploading'
                ? photo.progress
                : undefined
            }
            hasError={
              photo.kind === DISPLAY_PHOTO_KIND.PENDING && photo.status === 'error'
            }
          />
        );
      })}
    </PhotoGridContainer>
  );
};

export default AlbumDetail;
