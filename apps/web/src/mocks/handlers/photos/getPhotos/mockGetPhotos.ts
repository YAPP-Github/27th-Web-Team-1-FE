import { http, HttpResponse, delay } from 'msw';
import { photoListMockData } from './mockData';

export const mockGetPhotosHandler = http.get('*/photos', async ({ request }) => {
  await delay(300);

  const url = new URL(request.url);
  const albumId = url.searchParams.get('albumId');

  if (!albumId) {
    return HttpResponse.json(
      { message: 'albumId is required' },
      { status: 400 },
    );
  }

  const album = photoListMockData.albums?.find(
    (a) => a.id === Number(albumId),
  );

  if (!album) {
    return HttpResponse.json({ albums: [] }, { status: 200 });
  }

  return HttpResponse.json({ albums: [album] }, { status: 200 });
});
