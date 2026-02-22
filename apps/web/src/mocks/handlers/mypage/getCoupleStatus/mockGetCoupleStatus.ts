import type { CoupleStatusResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 커플_상태_조회_연결됨, 커플_상태_조회_미연결 } from './mockData';

export const mockGetCoupleStatus = {
  url: API_URL.COUPLES.STATUS,
  description: '내 커플 상태 조회',
  method: 'get',
  response: {
    커플_상태_조회_연결됨: {
      status: 200,
      delayTime: 300,
      data: 커플_상태_조회_연결됨,
    },
    커플_상태_조회_미연결: {
      status: 200,
      delayTime: 300,
      data: 커플_상태_조회_미연결,
    },
  },
} satisfies MockApiResponse<
  '커플_상태_조회_연결됨' | '커플_상태_조회_미연결',
  CoupleStatusResponse
>;
