'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGetClusterPhotos } from '@repo/api-client';
import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import { ROUTES } from '@/constants/routes';

interface ClusterDetailProps {
  clusterId: string;
}

const ClusterDetail = ({ clusterId }: ClusterDetailProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetClusterPhotos(clusterId, {
    page: 0,
    size: 100,
  });

  const processedPhotos = useMemo(() => {
    if (!data?.photos) return [];

    // 날짜순으로 정렬 (최신순)
    const sortedPhotos = [...data.photos].sort((a, b) => {
      const dateA = a.date ? new Date(a.date.replace(/\./g, '-')).getTime() : 0;
      const dateB = b.date ? new Date(b.date.replace(/\./g, '-')).getTime() : 0;
      return dateB - dateA;
    });

    // 각 날짜의 첫 번째 사진에만 showDate: true 설정
    const seenDates = new Set<string>();
    return sortedPhotos.map((photo) => {
      if (photo.date && !seenDates.has(photo.date)) {
        seenDates.add(photo.date);
        return { ...photo, showDate: true };
      }
      return { ...photo, showDate: false };
    });
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>사진을 불러올 수 없어요.</div>;

  const handlePhotoClick = (photoId: number) => {
    router.push(ROUTES.PHOTO.VIEW(photoId));
  };

  return (
    <PhotoGridContainer>
      {processedPhotos.map((photo) => (
        <PhotoGridItem
          key={photo.id}
          src={photo.url ?? ''}
          alt={`cluster-photo-${photo.id}`}
          date={(photo as any).showDate ? photo.date : undefined}
          onClick={() => handlePhotoClick(photo.id ?? 0)}
        />
      ))}
    </PhotoGridContainer>
  );
};

export default ClusterDetail;
