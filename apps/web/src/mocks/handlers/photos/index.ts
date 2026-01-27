import { createHandler } from '@/mocks/createHandler';
import { mockCreatePhoto } from './createPhoto/mockCreatePhoto';
import { mockGetPhotoDetail } from './getPhotoDetail/mockGetPhotoDetail';
import { mockGetPhotos } from './getPhotos/mockGetPhotos';
import { mockGetPresignedUrl } from './getPresignedUrl/mockGetPresignedUrl';
import { s3UploadHandler } from './getPresignedUrl/mockS3Upload';

export const photosHandlers = [
  createHandler(mockGetPhotoDetail, '사진_상세_조회_성공'),
  createHandler(mockGetPhotos, '사진_목록_조회_성공'),
  createHandler(mockGetPresignedUrl, 'presigned_url_발급_성공'),
  s3UploadHandler,
  createHandler(mockCreatePhoto, '사진_생성_성공'),
];
