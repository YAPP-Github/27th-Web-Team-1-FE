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
  const { data, isLoading, isError } = useGetClusterPhotos(clusterId);

  const processedPhotos = useMemo(() => {
    if (!data) return [];

    // 날짜순으로 정렬 (최신순)
    const sortedPhotos = [...data].sort((a, b) => {
      const dateA = a.takenAt ? new Date(a.takenAt).getTime() : 0;
      const dateB = b.takenAt ? new Date(b.takenAt).getTime() : 0;
      return dateB - dateA;
    });

    // 각 날짜의 첫 번째 사진에만 showDate: true 설정
    const seenDates = new Set<string>();
    return sortedPhotos.map((photo) => {
      const dateKey = photo.takenAt?.slice(0, 10);
      if (dateKey && !seenDates.has(dateKey)) {
        seenDates.add(dateKey);
        return { ...photo, showDate: true };
      }
      return { ...photo, showDate: false };
    });
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>사진을 불러올 수 없어요.</div>;

  const handlePhotoClick = (photoId: number) => {
    router.push(ROUTES.PHOTO.VIEW_WITH_CLUSTER(photoId, clusterId));
  };

  return (
    <PhotoGridContainer>
      {processedPhotos.map((photo) => (
        <PhotoGridItem
          key={photo.id}
          src={photo.url ?? ''}
          alt={`cluster-photo-${photo.id}`}
          date={(photo as any).showDate ? photo.takenAt : undefined}
          onClick={() => handlePhotoClick(photo.id ?? 0)}
        />
      ))}
    </PhotoGridContainer>
  );
};

export default ClusterDetail;
