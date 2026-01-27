import type { SelectableAlbumResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 선택_가능_앨범_조회_성공 } from './mockData';

export const mockGetSelectableAlbums = {
  url: API_URL.ALBUMS.SELECTABLE,
  description: '선택 가능 앨범 조회',
  method: 'get',
  response: {
    선택_가능_앨범_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 선택_가능_앨범_조회_성공,
    },
  },
} satisfies MockApiResponse<'선택_가능_앨범_조회_성공', SelectableAlbumResponse>;
