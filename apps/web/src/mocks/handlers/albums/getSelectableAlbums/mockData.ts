import type { SelectableAlbumResponse } from '@repo/api-client';

export const 선택_가능_앨범_조회_성공: SelectableAlbumResponse = {
  albums: [
    {
      id: 1,
      title: '우리의 추억',
      photoCount: 5,
      thumbnailUrl: 'https://picsum.photos/200/200?random=1',
    },
    {
      id: 2,
      title: '가족 여행',
      photoCount: 12,
      thumbnailUrl: 'https://picsum.photos/200/200?random=10',
    },
    {
      id: 3,
      title: '친구들과 함께',
      photoCount: 8,
      thumbnailUrl: 'https://picsum.photos/200/200?random=20',
    },
  ],
};
