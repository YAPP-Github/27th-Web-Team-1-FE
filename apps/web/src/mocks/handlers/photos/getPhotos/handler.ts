import { http, HttpResponse, delay } from 'msw';
import type { PhotoListResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import { photoListMockData, 사진_목록_조회_성공 } from './mockData';

const getAlbumById = (albumId: number): PhotoListResponse => {
  const album = photoListMockData.albums?.find((a) => a.id === albumId);
  return { albums: album ? [album] : [] };
};

// albumId 쿼리 파라미터를 처리하는 커스텀 핸들러
export const getPhotosHandler = http.get(
  `*${API_URL.PHOTOS.BASE}`,
  async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const albumId = url.searchParams.get('albumId');

    if (albumId) {
      return HttpResponse.json({ data: getAlbumById(Number(albumId)) }, { status: 200 });
    }

    return HttpResponse.json({ data: 사진_목록_조회_성공 }, { status: 200 });
  },
);
