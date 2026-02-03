import type { LocationInfoResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 주소_조회_성공 } from './mockData';

export const mockGetAddress = {
  url: API_URL.MAP.LOCATION,
  description: '위치 주소 조회 (역지오코딩)',
  method: 'get',
  response: {
    주소_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 주소_조회_성공,
    },
    좌표_누락: {
      status: 400,
      delayTime: 100,
      data: {
        code: 400,
        message: '잘못된 입력값입니다',
        data: {
          errorCode: 'LOCATION_001',
          detail: '위도/경도 값이 누락되었습니다',
          instance: '/map/location',
          errors: {
            latitude: 'required',
            longitude: 'required',
          },
        },
      },
    },
  },
} satisfies MockApiResponse<'주소_조회_성공' | '좌표_누락', LocationInfoResponse>;
