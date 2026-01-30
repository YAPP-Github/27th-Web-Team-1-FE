import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';

export const mockDeletePhoto = {
  url: API_URL.PHOTOS.DETAIL(':id'),
  description: '사진 삭제',
  method: 'delete',
  response: {
    사진_삭제_성공: {
      status: 204,
      delayTime: 300,
      data: null,
    },
  },
} satisfies MockApiResponse<'사진_삭제_성공', null>;
