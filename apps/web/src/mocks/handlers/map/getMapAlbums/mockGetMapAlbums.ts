import type { AlbumMapInfoResponse } from '@repo/api-client';
import type { MockApiResponse } from '@/mocks/types';
import { 앨범_지도정보_조회_성공, 앨범_지도정보_사진없음 } from './mockData';

export const mockGetMapAlbums = {
  url: '/map/albums/:albumId',
  description: '앨범 지도 정보 조회',
  method: 'get',
  response: {
    앨범_지도정보_조회_성공: {
      status: 200,
      delayTime: 300,
      data: 앨범_지도정보_조회_성공,
    },
    앨범_지도정보_사진없음: {
      status: 200,
      delayTime: 300,
      data: 앨범_지도정보_사진없음,
    },
  },
} satisfies MockApiResponse<
  '앨범_지도정보_조회_성공' | '앨범_지도정보_사진없음',
  AlbumMapInfoResponse
>;
