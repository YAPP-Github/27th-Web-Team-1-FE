import type { SelectableAlbumResponse } from '@repo/api-client';

export const 앨범_목록_조회_성공: SelectableAlbumResponse = {
  albums: [
    {
      id: 1,
      title: '우리의 추억',
      photoCount: 42,
      thumbnailUrl: 'https://picsum.photos/200/200?random=1',
    },
    {
      id: 2,
      title: '여행',
      photoCount: 128,
      thumbnailUrl: 'https://picsum.photos/200/200?random=2',
    },
    {
      id: 3,
      title: '일상',
      photoCount: 15,
      thumbnailUrl: 'https://picsum.photos/200/200?random=3',
    },
    {
      id: 4,
      title: '가족',
      photoCount: 67,
      thumbnailUrl: 'https://picsum.photos/200/200?random=4',
    },
    {
      id: 5,
      title: '친구들',
      photoCount: 23,
      thumbnailUrl: 'https://picsum.photos/200/200?random=5',
    },
    {
      id: 6,
      title: '맛집 탐방',
      photoCount: 89,
      thumbnailUrl: 'https://picsum.photos/200/200?random=6',
    },
  ],
};
