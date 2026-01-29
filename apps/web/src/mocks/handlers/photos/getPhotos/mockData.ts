import type { PhotoListResponse } from '@repo/api-client';

const center = { latitude: 37.5665, longitude: 126.978 };

export const photoListMockData: PhotoListResponse = {
  albums: [
    {
      id: 1,
      title: '한강 라이딩',
      photoCount: 5,
      thumbnailUrl: 'https://picsum.photos/id/1018/300/300',
      photos: [
        {
          id: 101,
          url: 'https://picsum.photos/id/1018/300/300',
          location: {
            latitude: center.latitude + 0.003,
            longitude: center.longitude + 0.008,
          },
        },
        {
          id: 102,
          url: 'https://picsum.photos/id/1020/300/300',
          location: {
            latitude: center.latitude + 0.006,
            longitude: center.longitude + 0.004,
          },
        },
        {
          id: 103,
          url: 'https://picsum.photos/id/1024/300/300',
          location: {
            latitude: center.latitude - 0.004,
            longitude: center.longitude + 0.002,
          },
        },
        {
          id: 104,
          url: 'https://picsum.photos/id/1027/300/300',
          location: {
            latitude: center.latitude - 0.002,
            longitude: center.longitude - 0.006,
          },
        },
        {
          id: 105,
          url: 'https://picsum.photos/id/1035/300/300',
          location: {
            latitude: center.latitude + 0.004,
            longitude: center.longitude - 0.004,
          },
        },
      ],
    },
    {
      id: 2,
      title: '카페 투어',
      photoCount: 4,
      thumbnailUrl: 'https://picsum.photos/id/1043/300/300',
      photos: [
        {
          id: 201,
          url: 'https://picsum.photos/id/1043/300/300',
          location: {
            latitude: center.latitude + 0.012,
            longitude: center.longitude - 0.002,
          },
        },
        {
          id: 202,
          url: 'https://picsum.photos/id/1050/300/300',
          location: {
            latitude: center.latitude + 0.009,
            longitude: center.longitude - 0.007,
          },
        },
        {
          id: 203,
          url: 'https://picsum.photos/id/1052/300/300',
          location: {
            latitude: center.latitude + 0.007,
            longitude: center.longitude - 0.011,
          },
        },
        {
          id: 204,
          url: 'https://picsum.photos/id/1060/300/300',
          location: {
            latitude: center.latitude + 0.011,
            longitude: center.longitude - 0.009,
          },
        },
      ],
    },
    {
      id: 3,
      title: '야경 산책',
      photoCount: 6,
      thumbnailUrl: 'https://picsum.photos/id/1063/300/300',
      photos: [
        {
          id: 301,
          url: 'https://picsum.photos/id/1063/300/300',
          location: {
            latitude: center.latitude - 0.008,
            longitude: center.longitude + 0.01,
          },
        },
        {
          id: 302,
          url: 'https://picsum.photos/id/1067/300/300',
          location: {
            latitude: center.latitude - 0.01,
            longitude: center.longitude + 0.014,
          },
        },
        {
          id: 303,
          url: 'https://picsum.photos/id/1070/300/300',
          location: {
            latitude: center.latitude - 0.012,
            longitude: center.longitude + 0.008,
          },
        },
        {
          id: 304,
          url: 'https://picsum.photos/id/1074/300/300',
          location: {
            latitude: center.latitude - 0.006,
            longitude: center.longitude + 0.004,
          },
        },
        {
          id: 305,
          url: 'https://picsum.photos/id/1080/300/300',
          location: {
            latitude: center.latitude - 0.009,
            longitude: center.longitude + 0.001,
          },
        },
        {
          id: 306,
          url: 'https://picsum.photos/id/1084/300/300',
          location: {
            latitude: center.latitude - 0.004,
            longitude: center.longitude + 0.013,
          },
        },
      ],
    },
  ],
};

export const 사진_목록_조회_성공 = photoListMockData;
