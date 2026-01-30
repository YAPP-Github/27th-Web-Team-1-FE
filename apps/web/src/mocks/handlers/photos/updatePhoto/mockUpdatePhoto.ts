import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import type { IdResponse } from '@repo/api-client';

export const 사진_수정_성공: IdResponse = {
  id: 1,
};

export const mockUpdatePhoto = {
  url: API_URL.PHOTOS.DETAIL(':id'),
  description: '사진 수정',
  method: 'put',
  response: {
    사진_수정_성공: {
      status: 200,
      delayTime: 300,
      data: 사진_수정_성공,
    },
  },
} satisfies MockApiResponse<'사진_수정_성공', IdResponse>;
