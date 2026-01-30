import { http, HttpResponse, delay } from 'msw';
import type { PhotoListResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import { photoListMockData, 사진_목록_조회_성공 } from './mockData';

const getAlbumById = (albumId: number): PhotoListResponse => {
  const album = photoListMockData.albums?.find((a) => a.id === albumId);
  return { albums: album ? [album] : [] };
};

// /photos/album/:albumId 엔드포인트 핸들러
export const getPhotosHandler = http.get(
  `*${API_URL.PHOTOS.BY_ALBUM(':albumId')}`,
  async ({ params }) => {
    await delay(300);

    const albumId = params.albumId;
    if (albumId) {
      return HttpResponse.json({ data: getAlbumById(Number(albumId)) }, { status: 200 });
    }

    return HttpResponse.json({ data: 사진_목록_조회_성공 }, { status: 200 });
  },
);
