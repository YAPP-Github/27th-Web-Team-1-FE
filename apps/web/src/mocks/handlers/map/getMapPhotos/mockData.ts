import type { MapPhotoResponse, ClusterResponse } from '@repo/api-client';

const center = { latitude: 37.5665, longitude: 126.978 };

interface MockMapPhoto extends MapPhotoResponse {
  albumId: number;
}

export const allMapPhotos: MockMapPhoto[] = [
  // 앨범 1: 한강 라이딩 (id: 101-105)
  {
    id: 101,
    albumId: 1,
    thumbnailUrl: 'https://picsum.photos/id/1018/300/300',
    latitude: center.latitude + 0.003,
    longitude: center.longitude + 0.008,
    takenAt: '2024-01-15T00:00:00',
  },
  {
    id: 102,
    albumId: 1,
    thumbnailUrl: 'https://picsum.photos/id/1020/300/300',
    latitude: center.latitude + 0.006,
    longitude: center.longitude + 0.004,
    takenAt: '2024-01-16T00:00:00',
  },
  {
    id: 103,
    albumId: 1,
    thumbnailUrl: 'https://picsum.photos/id/1024/300/300',
    latitude: center.latitude - 0.004,
    longitude: center.longitude + 0.002,
    takenAt: '2024-01-17T00:00:00',
  },
  {
    id: 104,
    albumId: 1,
    thumbnailUrl: 'https://picsum.photos/id/1027/300/300',
    latitude: center.latitude - 0.002,
    longitude: center.longitude - 0.006,
    takenAt: '2024-01-18T00:00:00',
  },
  {
    id: 105,
    albumId: 1,
    thumbnailUrl: 'https://picsum.photos/id/1035/300/300',
    latitude: center.latitude + 0.004,
    longitude: center.longitude - 0.004,
    takenAt: '2024-01-19T00:00:00',
  },
  // 앨범 2: 카페 투어 (id: 201-204)
  {
    id: 201,
    albumId: 2,
    thumbnailUrl: 'https://picsum.photos/id/1043/300/300',
    latitude: center.latitude + 0.012,
    longitude: center.longitude - 0.002,
    takenAt: '2024-02-01T00:00:00',
  },
  {
    id: 202,
    albumId: 2,
    thumbnailUrl: 'https://picsum.photos/id/1050/300/300',
    latitude: center.latitude + 0.009,
    longitude: center.longitude - 0.007,
    takenAt: '2024-02-02T00:00:00',
  },
  {
    id: 203,
    albumId: 2,
    thumbnailUrl: 'https://picsum.photos/id/1052/300/300',
    latitude: center.latitude + 0.007,
    longitude: center.longitude - 0.011,
    takenAt: '2024-02-03T00:00:00',
  },
  {
    id: 204,
    albumId: 2,
    thumbnailUrl: 'https://picsum.photos/id/1060/300/300',
    latitude: center.latitude + 0.011,
    longitude: center.longitude - 0.009,
    takenAt: '2024-02-04T00:00:00',
  },
  // 앨범 3: 야경 산책 (id: 301-306)
  {
    id: 301,
    albumId: 3,
    thumbnailUrl: 'https://picsum.photos/id/1063/300/300',
    latitude: center.latitude - 0.008,
    longitude: center.longitude + 0.01,
    takenAt: '2024-03-01T00:00:00',
  },
  {
    id: 302,
    albumId: 3,
    thumbnailUrl: 'https://picsum.photos/id/1067/300/300',
    latitude: center.latitude - 0.01,
    longitude: center.longitude + 0.014,
    takenAt: '2024-03-02T00:00:00',
  },
  {
    id: 303,
    albumId: 3,
    thumbnailUrl: 'https://picsum.photos/id/1070/300/300',
    latitude: center.latitude - 0.012,
    longitude: center.longitude + 0.008,
    takenAt: '2024-03-03T00:00:00',
  },
  {
    id: 304,
    albumId: 3,
    thumbnailUrl: 'https://picsum.photos/id/1074/300/300',
    latitude: center.latitude - 0.006,
    longitude: center.longitude + 0.004,
    takenAt: '2024-03-04T00:00:00',
  },
  {
    id: 305,
    albumId: 3,
    thumbnailUrl: 'https://picsum.photos/id/1080/300/300',
    latitude: center.latitude - 0.009,
    longitude: center.longitude + 0.001,
    takenAt: '2024-03-05T00:00:00',
  },
  {
    id: 306,
    albumId: 3,
    thumbnailUrl: 'https://picsum.photos/id/1084/300/300',
    latitude: center.latitude - 0.004,
    longitude: center.longitude + 0.013,
    takenAt: '2024-03-06T00:00:00',
  },
];

interface MockCluster extends ClusterResponse {
  albumId: number;
}

export const allClusters: MockCluster[] = [
  {
    clusterId: 'z12_130234_38456',
    albumId: 1,
    count: 5,
    thumbnailUrl: 'https://picsum.photos/id/1018/300/300',
    latitude: center.latitude + 0.004,
    longitude: center.longitude + 0.002,
  },
  {
    clusterId: 'z12_130235_38457',
    albumId: 2,
    count: 4,
    thumbnailUrl: 'https://picsum.photos/id/1043/300/300',
    latitude: center.latitude + 0.01,
    longitude: center.longitude - 0.005,
  },
  {
    clusterId: 'z12_130236_38458',
    albumId: 3,
    count: 6,
    thumbnailUrl: 'https://picsum.photos/id/1063/300/300',
    latitude: center.latitude - 0.008,
    longitude: center.longitude + 0.008,
  },
];
