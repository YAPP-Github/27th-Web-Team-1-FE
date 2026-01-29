import type { PhotoDetailResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 사진_상세_조회_성공 } from './mockData';

export const mockGetPhotoDetail = {
  url: API_URL.PHOTOS.DETAIL(':photoId'),
  description: '사진 상세 조회',
  method: 'get',
  response: {
    사진_상세_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 사진_상세_조회_성공,
    },
  },
} satisfies MockApiResponse<'사진_상세_조회_성공', PhotoDetailResponse>;
