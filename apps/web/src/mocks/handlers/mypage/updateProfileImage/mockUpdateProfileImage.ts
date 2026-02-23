import type { IdResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 프로필_사진_수정_성공 } from './mockData';

export const mockUpdateProfileImage = {
  url: API_URL.MY_PAGE.PROFILE_IMAGE,
  description: '프로필 사진 수정',
  method: 'put',
  response: {
    프로필_사진_수정_성공: {
      status: 200,
      delayTime: 300,
      data: 프로필_사진_수정_성공,
    },
  },
} satisfies MockApiResponse<'프로필_사진_수정_성공', IdResponse>;
