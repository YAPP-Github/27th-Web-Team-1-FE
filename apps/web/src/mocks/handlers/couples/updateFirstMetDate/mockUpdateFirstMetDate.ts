import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';

export const mockUpdateFirstMetDate = {
  url: API_URL.COUPLES.FIRST_MET_DATE,
  description: '처음 만난 날짜 수정',
  method: 'patch',
  response: {
    날짜_수정_성공: {
      status: 204,
      delayTime: 300,
      data: {},
    },
  },
} satisfies MockApiResponse<'날짜_수정_성공', unknown>;
