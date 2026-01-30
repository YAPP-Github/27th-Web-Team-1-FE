import { http, HttpResponse, delay } from 'msw';
import { API_URL } from '@/constants';
import { 선택_가능_앨범_조회_성공 } from './mockData';

export const getSelectableAlbumsHandler = http.get(
  `*${API_URL.ALBUMS.SELECTABLE}`,
  async () => {
    await delay(300);
    return HttpResponse.json({ data: 선택_가능_앨범_조회_성공 }, { status: 200 });
  },
);
