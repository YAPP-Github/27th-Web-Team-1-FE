import type { PresignedUrl } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { presigned_url_발급_성공 } from './mockData';

export const mockGetPresignedUrl = {
  url: API_URL.PHOTOS.PRESIGNED_URL,
  description: 'S3 Presigned URL 발급',
  method: 'post',
  response: {
    presigned_url_발급_성공: {
      status: 200,
      delayTime: 300,
      data: presigned_url_발급_성공,
    },
  },
} satisfies MockApiResponse<'presigned_url_발급_성공', PresignedUrl>;
