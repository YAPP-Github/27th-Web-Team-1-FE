import type { PhotoListResponse } from '@repo/api-client';

export const 사진_목록_조회_성공: PhotoListResponse = {
  albums: [
    {
      id: 1,
      title: '우리의 추억',
      photoCount: 5,
      thumbnailUrl: 'https://picsum.photos/200/200?random=1',
      photos: [
        {
          id: 1,
          url: 'https://picsum.photos/800/1200?random=1',
          location: { longitude: 127.0276, latitude: 37.4979 },
          description: '오늘 정말 좋은 날이었어요!',
        },
        {
          id: 2,
          url: 'https://picsum.photos/800/1200?random=2',
          location: { longitude: 127.0286, latitude: 37.4989 },
          description: '맛있는 점심',
        },
        {
          id: 3,
          url: 'https://picsum.photos/800/1200?random=3',
          location: { longitude: 127.0296, latitude: 37.4999 },
          description: '산책하는 중',
        },
        {
          id: 4,
          url: 'https://picsum.photos/800/1200?random=4',
          location: { longitude: 127.0306, latitude: 37.5009 },
          description: '카페에서',
        },
        {
          id: 5,
          url: 'https://picsum.photos/800/1200?random=5',
          location: { longitude: 127.0316, latitude: 37.5019 },
          description: '저녁 노을',
        },
      ],
    },
  ],
};
