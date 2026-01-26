import type { SelectableAlbumResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 앨범_목록_조회_성공 } from './mockData';

export const mockGetSelectableAlbums = {
  url: API_URL.ALBUMS.SELECTABLE,
  description: '선택 가능한 앨범 목록 조회',
  method: 'get',
  response: {
    앨범_목록_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 앨범_목록_조회_성공,
    },
  },
} satisfies MockApiResponse<'앨범_목록_조회_성공', SelectableAlbumResponse>;
