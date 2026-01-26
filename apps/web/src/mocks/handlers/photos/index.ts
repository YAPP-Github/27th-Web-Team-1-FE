import { createHandler } from '@/mocks/createHandler';
import { mockGetPresignedUrl } from './getPresignedUrl/mockGetPresignedUrl';
import { s3UploadHandler } from './getPresignedUrl/mockS3Upload';
import { mockCreatePhoto } from './createPhoto/mockCreatePhoto';

export const photosHandlers = [
  createHandler(mockGetPresignedUrl, 'presigned_url_발급_성공'),
  s3UploadHandler,
  createHandler(mockCreatePhoto, '사진_생성_성공'),
];
