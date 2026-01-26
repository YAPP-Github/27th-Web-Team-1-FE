import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { PlaceSearchResponse } from '@repo/api-client';
import { 장소_검색_성공, 장소_검색_결과없음 } from './mockData';

export const mockSearchPlaces = {
  url: API_URL.MAP.PLACES_SEARCH,
  description: '장소 검색',
  method: 'get',
  response: {
    장소_검색_성공: {
      status: 200,
      delayTime: 500,
      data: 장소_검색_성공,
    },
    장소_검색_결과없음: {
      status: 200,
      delayTime: 300,
      data: 장소_검색_결과없음,
    },
    검색어_누락: {
      status: 400,
      delayTime: 100,
      data: {
        code: 400,
        message: '잘못된 입력값입니다',
        data: {
          errorCode: 'MAP_001',
          detail: '검색어가 누락되었습니다',
          instance: '/map/places/search',
          errors: {
            query: 'required',
          },
        },
      },
    },
  },
} satisfies MockApiResponse<
  '장소_검색_성공' | '장소_검색_결과없음' | '검색어_누락',
  PlaceSearchResponse
>;
