import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';

export const mockLogout = {
  url: API_URL.AUTH.LOGOUT,
  description: '로그아웃',
  method: 'post',
  response: {
    로그아웃_성공: {
      status: 204,
      delayTime: 300,
      data: {},
    },
  },
} satisfies MockApiResponse<'로그아웃_성공', unknown>;
