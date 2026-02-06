import type { AlbumMapInfoResponse } from '@repo/api-client';

export const 앨범_지도정보_조회_성공: AlbumMapInfoResponse = {
  albumId: 1,
  centerLongitude: 126.978,
  centerLatitude: 37.5665,
  boundingBox: {
    west: 126.9,
    south: 37.5,
    east: 127.1,
    north: 37.6,
  },
};

export const 앨범_지도정보_사진없음: AlbumMapInfoResponse = {
  albumId: 2,
  centerLongitude: undefined,
  centerLatitude: undefined,
  boundingBox: undefined,
};
