'use client';

import { useRouter } from 'next/navigation';
import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import type { AlbumDetailData } from '@/types/album.type';

interface AlbumDetailProps {
  album?: AlbumDetailData;
}

const AlbumDetail = ({ album }: AlbumDetailProps) => {
  const router = useRouter();

  if (!album) {
    return <div>앨범 정보를 불러올 수 없어요.</div>;
  }

  const handlePhotoClick = (photoId: number) => {
    router.push(`/photo/${photoId}`);
  };

  return (
    <PhotoGridContainer>
      {album.photos.map((photo) => (
        <PhotoGridItem
          key={photo.id}
          src={photo.url}
          alt={`${album.title}-${photo.id}`}
          // TODO: 현재 API 스펙으로는 날짜를 받아올 수 없음
          date={`2024-01-20T00:00:00.000Z`}
          onClick={() => handlePhotoClick(photo.id)}
        />
      ))}
    </PhotoGridContainer>
  );
};

export default AlbumDetail;
