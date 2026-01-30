import type { MockApiResponse } from '@/mocks/types';
import { API_URL } from '@/constants';

export const mockDeleteAlbum = {
  url: API_URL.ALBUMS.DETAIL(':id'),
  description: '앨범 삭제',
  method: 'delete',
  response: {
    앨범_삭제_성공: {
      status: 204,
      delayTime: 300,
      data: null,
    },
  },
} satisfies MockApiResponse<'앨범_삭제_성공', null>;
