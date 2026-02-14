'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGetClusterPhotos, type ClusterPhotoResponse } from '@repo/api-client';
import PhotoGridContainer from '@/components/photoGridContainer/PhotoGridContainer';
import PhotoGridItem from '@/components/photoGridItem/PhotoGridItem';
import { ROUTES } from '@/constants/routes';
import { MAP_CLUSTERING_CONFIG } from '@/constants/map';
import { saveClusterToSession, getClusterFromSession } from '@/utils/sessionStorage';

interface ClusterDetailProps {
  clusterId: string;
  clusterExpansionData?: Map<string, ClusterPhotoResponse[]>;
}

const ClusterDetail = ({ clusterId, clusterExpansionData }: ClusterDetailProps) => {
  const router = useRouter();

  // 클라이언트 클러스터인지 판별
  const isClientCluster = clusterId.startsWith(
    MAP_CLUSTERING_CONFIG.CLIENT_CLUSTER_PREFIX,
  );

  // 클라이언트 클러스터인 경우 로컬 데이터 사용, 아니면 API 호출
  const clientClusterData = useMemo(() => {
    if (isClientCluster) {
      // 1. clusterExpansionData에서 먼저 찾기
      if (clusterExpansionData) {
        const data = clusterExpansionData.get(clusterId);
        if (data) {
          return data;
        }
      }

      // 2. sessionStorage에서 복구하기 (navigation 후 돌아온 경우)
      return getClusterFromSession<ClusterPhotoResponse[]>(clusterId);
    }
    return undefined;
  }, [isClientCluster, clusterId, clusterExpansionData]);

  const {
    data: serverClusterData,
    isLoading,
    isError,
  } = useGetClusterPhotos(isClientCluster ? '' : clusterId);

  const data = isClientCluster ? clientClusterData : serverClusterData;

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

  // 클라이언트 클러스터는 로딩/에러 상태 체크 불필요
  if (!isClientCluster && isLoading) return <div>로딩 중...</div>;
  if (!isClientCluster && isError) return <div>사진을 불러올 수 없어요.</div>;

  const handlePhotoClick = (photoId: number) => {
    // 클라이언트 클러스터인 경우 sessionStorage에 데이터 저장
    if (isClientCluster && data) {
      saveClusterToSession(clusterId, data);
    }
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
