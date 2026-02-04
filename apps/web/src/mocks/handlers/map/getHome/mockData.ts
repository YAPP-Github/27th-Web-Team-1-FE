import type { HomeResponse } from '@repo/api-client';

export const 홈_조회_성공: HomeResponse = {
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
  albums: [
    {
      id: 1,
      title: '서울 여행',
      photoCount: 12,
      thumbnailUrls: [
        'https://picsum.photos/200/200?random=1',
        'https://picsum.photos/200/200?random=2',
        'https://picsum.photos/200/200?random=3',
        'https://picsum.photos/200/200?random=4',
      ],
    },
    {
      id: 2,
      title: '제주도',
      photoCount: 8,
      thumbnailUrls: [
        'https://picsum.photos/200/200?random=5',
        'https://picsum.photos/200/200?random=6',
      ],
    },
    {
      id: 3,
      title: '부산 바다',
      photoCount: 5,
      thumbnailUrls: ['https://picsum.photos/200/200?random=7'],
    },
  ],
};

export const 홈_조회_사진없음: HomeResponse = {
  location: {
    address: '서울특별시 강남구 역삼동',
    placeName: '역삼역',
    regionName: '강남구',
  },
  boundingBox: undefined,
  albums: [],
};
