import type { SelectableAlbumResponse } from '@repo/api-client';

export const selectableAlbumsMockData: SelectableAlbumResponse = {
  albums: [
    {
      id: 1,
      title: '한강 라이딩',
      photoCount: 5,
      thumbnailUrls: ['https://picsum.photos/id/1018/300/300'],
    },
    {
      id: 2,
      title: '카페 투어',
      photoCount: 4,
      thumbnailUrls: ['https://picsum.photos/id/1043/300/300'],
    },
    {
      id: 3,
      title: '야경 산책',
      photoCount: 6,
      thumbnailUrls: ['https://picsum.photos/id/1063/300/300'],
    },
  ],
};

export const 선택_가능_앨범_조회_성공 = selectableAlbumsMockData;
