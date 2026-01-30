import type { PhotoListResponse } from '@repo/api-client';
import { photoListMockData } from '../getPhotos/mockData';

/**
 * albumId를 키로 하는 앨범별 사진 목록 맵
 * 각 albumId에 해당하는 앨범 데이터만 반환
 */
export const 앨범별_사진_목록: Record<number, PhotoListResponse> = {};

photoListMockData.albums?.forEach((album) => {
  앨범별_사진_목록[album.id!] = {
    albums: [album],
  };
});

/**
 * albumId로 해당 앨범의 사진 목록 조회
 * 존재하지 않는 albumId인 경우 빈 배열 반환
 */
export const getPhotosByAlbumId = (albumId: number): PhotoListResponse => {
  return 앨범별_사진_목록[albumId] || { albums: [] };
};
