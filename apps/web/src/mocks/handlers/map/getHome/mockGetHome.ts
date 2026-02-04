import type { HomeResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 홈_조회_성공, 홈_조회_사진없음 } from './mockData';

export const mockGetHome = {
  url: API_URL.MAP.HOME,
  description: '홈 조회 (홈 화면 초기 진입 시 1회 호출)',
  method: 'get',
  response: {
    홈_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 홈_조회_성공,
    },
    홈_조회_사진없음: {
      status: 200,
      delayTime: 300,
      data: 홈_조회_사진없음,
    },
    좌표_누락: {
      status: 400,
      delayTime: 100,
      data: {
        code: 400,
        message: '잘못된 입력값입니다',
        data: {
          errorCode: 'HOME_001',
          detail: '위도/경도 값이 누락되었습니다',
          instance: '/map/home',
          errors: {
            latitude: 'required',
            longitude: 'required',
          },
        },
      },
    },
  },
} satisfies MockApiResponse<
  '홈_조회_성공' | '홈_조회_사진없음' | '좌표_누락',
  HomeResponse
>;
