import { http, HttpResponse, delay } from 'msw';
import { selectableAlbumsMockData } from './mockData';

export const mockGetSelectableAlbumsHandler = http.get(
  '*/albums/selectable',
  async () => {
    await delay(300);
    return HttpResponse.json(selectableAlbumsMockData, { status: 200 });
  },
);
