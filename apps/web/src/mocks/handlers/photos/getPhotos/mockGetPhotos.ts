import type { PhotoListResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 사진_목록_조회_성공 } from './mockData';

export const mockGetPhotos = {
  url: API_URL.PHOTOS.BASE,
  description: '사진 목록 조회',
  method: 'get',
  response: {
    사진_목록_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 사진_목록_조회_성공,
    },
  },
} satisfies MockApiResponse<'사진_목록_조회_성공', PhotoListResponse>;
