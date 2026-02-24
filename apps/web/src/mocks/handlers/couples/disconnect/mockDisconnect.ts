import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';

export const mockDisconnect = {
  url: API_URL.COUPLES.BASE,
  description: '커플 연결 끊기',
  method: 'delete',
  response: {
    연결_끊기_성공: {
      status: 204,
      delayTime: 300,
      data: {},
    },
  },
} satisfies MockApiResponse<'연결_끊기_성공', unknown>;
