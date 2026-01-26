import type { IdResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 사진_생성_성공 } from './mockData';

export const mockCreatePhoto = {
  url: API_URL.PHOTOS.BASE,
  description: '사진 생성',
  method: 'post',
  response: {
    사진_생성_성공: {
      status: 200,
      delayTime: 300,
      data: 사진_생성_성공,
    },
  },
} satisfies MockApiResponse<'사진_생성_성공', IdResponse>;
