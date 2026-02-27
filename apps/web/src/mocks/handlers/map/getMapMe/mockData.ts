import type { MapMeResponse } from '@repo/api-client';

const center = { latitude: 37.5665, longitude: 126.978 };

export const 지도_ME_조회_성공: MapMeResponse = {
  location: {
    address: '서울특별시 영등포구 여의도동',
    placeName: '여의도 한강공원',
    regionName: '영등포구',
  },
  boundingBox: {
    west: 126.9,
    south: 37.5,
    east: 127.1,
    north: 37.6,
  },
  totalHistoryCount: 15,
  albums: [
    {
      id: 100,
      title: '전체사진',
      photoCount: 15,
      thumbnailUrls: [
        'https://picsum.photos/id/1018/200/200',
        'https://picsum.photos/id/1020/200/200',
        'https://picsum.photos/id/1024/200/200',
        'https://picsum.photos/id/1043/200/200',
      ],
    },
    {
      id: 1,
      title: '한강 라이딩',
      photoCount: 5,
      thumbnailUrls: [
        'https://picsum.photos/id/1018/200/200',
        'https://picsum.photos/id/1020/200/200',
        'https://picsum.photos/id/1024/200/200',
        'https://picsum.photos/id/1027/200/200',
      ],
    },
    {
      id: 2,
      title: '카페 투어',
      photoCount: 4,
      thumbnailUrls: [
        'https://picsum.photos/id/1043/200/200',
        'https://picsum.photos/id/1050/200/200',
      ],
    },
    {
      id: 3,
      title: '야경 산책',
      photoCount: 6,
      thumbnailUrls: ['https://picsum.photos/id/1063/200/200'],
    },
  ],
  clusters: [
    {
      clusterId: 'z12_130234_38456',
      count: 5,
      thumbnailUrl: 'https://picsum.photos/id/1018/300/300',
      latitude: center.latitude + 0.004,
      longitude: center.longitude + 0.002,
    },
    {
      clusterId: 'z12_130235_38457',
      count: 4,
      thumbnailUrl: 'https://picsum.photos/id/1043/300/300',
      latitude: center.latitude + 0.01,
      longitude: center.longitude - 0.005,
    },
    {
      clusterId: 'z12_130236_38458',
      count: 6,
      thumbnailUrl: 'https://picsum.photos/id/1063/300/300',
      latitude: center.latitude - 0.008,
      longitude: center.longitude + 0.008,
    },
  ],
  photos: [
    {
      id: 101,
      thumbnailUrl: 'https://picsum.photos/id/1018/300/300',
      latitude: center.latitude + 0.003,
      longitude: center.longitude + 0.008,
      takenAt: '2024-01-15T00:00:00',
    },
    {
      id: 102,
      thumbnailUrl: 'https://picsum.photos/id/1020/300/300',
      latitude: center.latitude + 0.006,
      longitude: center.longitude + 0.004,
      takenAt: '2024-01-16T00:00:00',
    },
    {
      id: 103,
      thumbnailUrl: 'https://picsum.photos/id/1024/300/300',
      latitude: center.latitude - 0.004,
      longitude: center.longitude + 0.002,
      takenAt: '2024-01-17T00:00:00',
    },
    {
      id: 201,
      thumbnailUrl: 'https://picsum.photos/id/1043/300/300',
      latitude: center.latitude + 0.012,
      longitude: center.longitude - 0.002,
      takenAt: '2024-02-01T00:00:00',
    },
    {
      id: 301,
      thumbnailUrl: 'https://picsum.photos/id/1063/300/300',
      latitude: center.latitude - 0.008,
      longitude: center.longitude + 0.01,
      takenAt: '2024-03-01T00:00:00',
    },
  ],
};

export const 지도_ME_조회_사진없음: MapMeResponse = {
  location: {
    address: '서울특별시 강남구 역삼동',
    placeName: '역삼역',
    regionName: '강남구',
  },
  boundingBox: undefined,
  totalHistoryCount: 0,
  albums: [],
  clusters: [],
  photos: [],
};
