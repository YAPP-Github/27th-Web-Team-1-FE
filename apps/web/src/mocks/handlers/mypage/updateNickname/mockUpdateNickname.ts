import type { IdResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 닉네임_수정_성공 } from './mockData';

export const mockUpdateNickname = {
  url: API_URL.MY_PAGE.NICKNAME,
  description: '닉네임 수정',
  method: 'put',
  response: {
    닉네임_수정_성공: {
      status: 200,
      delayTime: 300,
      data: 닉네임_수정_성공,
    },
  },
} satisfies MockApiResponse<'닉네임_수정_성공', IdResponse>;
