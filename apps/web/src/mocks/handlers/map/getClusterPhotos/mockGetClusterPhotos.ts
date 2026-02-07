import { http, HttpResponse, delay } from 'msw';
import { allMapPhotos } from '../getMapPhotos/mockData';
import type { ClusterPhotoResponse } from '@repo/api-client';

// clusterId에서 앨범 ID를 추출하는 간단한 로직
// 실제로는 clusterId로 해당 클러스터의 사진을 찾아야 하지만
// mock에서는 모든 사진을 반환
const getClusterPhotos = (clusterId: string): ClusterPhotoResponse[] => {
  // clusterId에서 앨범을 유추하거나 모든 사진 반환
  return allMapPhotos.map((photo) => ({
    id: photo.id,
    url: photo.thumbnailUrl,
    longitude: photo.longitude ?? 126.978,
    latitude: photo.latitude ?? 37.5665,
    takenAt: photo.takenAt,
    address: '서울특별시 중구',
  }));
};

export const mockGetClusterPhotosHandler = http.get(
  '*/map/clusters/:clusterId/photos',
  async ({ params }) => {
    await delay(300);

    const clusterId = params.clusterId as string;
    const photos = getClusterPhotos(clusterId);

    return HttpResponse.json({ data: photos }, { status: 200 });
  },
);
