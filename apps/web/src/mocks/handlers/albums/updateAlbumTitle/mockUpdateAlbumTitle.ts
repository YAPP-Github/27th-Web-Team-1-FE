import type { IdResponse } from '@repo/api-client';
import type { MockApiResponse } from '@/mocks/types';
import { API_URL } from '@/constants';

export const mockUpdateAlbumTitle = {
  url: API_URL.ALBUMS.DETAIL(':id'),
  description: '앨범 제목 수정',
  method: 'patch',
  response: {
    앨범_제목_수정_성공: {
      status: 200,
      delayTime: 300,
      data: { id: 1 } as IdResponse,
    },
  },
} satisfies MockApiResponse<'앨범_제목_수정_성공', IdResponse>;
