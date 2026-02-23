import type { MyPageResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 마이페이지_조회_성공, 마이페이지_조회_미연결 } from './mockData';

export const mockGetMyPage = {
  url: API_URL.MY_PAGE.BASE,
  description: '마이페이지 조회',
  method: 'get',
  response: {
    마이페이지_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 마이페이지_조회_성공,
    },
    마이페이지_조회_미연결: {
      status: 200,
      delayTime: 300,
      data: 마이페이지_조회_미연결,
    },
  },
} satisfies MockApiResponse<
  '마이페이지_조회_성공' | '마이페이지_조회_미연결',
  MyPageResponse
>;
