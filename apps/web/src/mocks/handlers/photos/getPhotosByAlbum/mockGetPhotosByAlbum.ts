import type { PhotoListResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 앨범별_사진_목록 } from './mockData';

export const mockGetPhotosByAlbum = {
  url: API_URL.PHOTOS.BY_ALBUM(':albumId'),
  description: '앨범별 사진 목록 조회',
  method: 'get',
  response: {
    앨범별_사진_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 앨범별_사진_목록[1],
    },
  },
} satisfies MockApiResponse<'앨범별_사진_조회_성공', PhotoListResponse>;
