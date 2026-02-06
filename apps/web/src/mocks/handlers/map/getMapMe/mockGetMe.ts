import type { MapMeResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 지도_ME_조회_성공, 지도_ME_조회_사진없음 } from './mockData';

export const mockGetMe = {
  url: API_URL.MAP.ME,
  description: '지도 ME 조회 (홈 + 사진 조회 통합)',
  method: 'get',
  response: {
    지도_ME_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 지도_ME_조회_성공,
    },
    지도_ME_조회_사진없음: {
      status: 200,
      delayTime: 300,
      data: 지도_ME_조회_사진없음,
    },
    파라미터_누락: {
      status: 400,
      delayTime: 100,
      data: {
        code: 400,
        message: '잘못된 입력값입니다',
        data: {
          errorCode: 'MAP_ME_001',
          detail: '필수 파라미터가 누락되었습니다',
          instance: '/map/me',
          errors: {
            bbox: 'required',
          },
        },
      },
    },
  },
} satisfies MockApiResponse<
  '지도_ME_조회_성공' | '지도_ME_조회_사진없음' | '파라미터_누락',
  MapMeResponse
>;
