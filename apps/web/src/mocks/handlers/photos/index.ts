import { createHandler } from '@/mocks/createHandler';
import { mockCreatePhoto } from './createPhoto/mockCreatePhoto';
import { mockDeletePhoto } from './deletePhoto/mockDeletePhoto';
import { mockGetPhotoDetail } from './getPhotoDetail/mockGetPhotoDetail';
import { 사진_상세_목록, 사진_상세_조회_성공 } from './getPhotoDetail/mockData';
import { mockGetPhotos } from './getPhotos/mockGetPhotos';
import { mockGetPhotosByAlbum } from './getPhotosByAlbum/mockGetPhotosByAlbum';
import { getPhotosByAlbumId } from './getPhotosByAlbum/mockData';
import { mockGetPresignedUrl } from './getPresignedUrl/mockGetPresignedUrl';
import { s3UploadHandler } from './getPresignedUrl/mockS3Upload';
import { mockUpdatePhoto } from './updatePhoto/mockUpdatePhoto';

export const photosHandlers = [
  createHandler(mockGetPhotoDetail, '사진_상세_조회_성공', {
    dataResolver: (params) => {
      const photoId = Number(params.photoId);
      return 사진_상세_목록[photoId] || { ...사진_상세_조회_성공, id: photoId };
    },
  }),
  createHandler(mockGetPhotos, '사진_목록_조회_성공'),
  createHandler(mockGetPhotosByAlbum, '앨범별_사진_조회_성공', {
    dataResolver: (params) => {
      const albumId = Number(params.albumId);
      return getPhotosByAlbumId(albumId);
    },
  }),
  createHandler(mockGetPresignedUrl, 'presigned_url_발급_성공'),
  s3UploadHandler,
  createHandler(mockCreatePhoto, '사진_생성_성공'),
  createHandler(mockDeletePhoto, '사진_삭제_성공'),
  createHandler(mockUpdatePhoto, '사진_수정_성공'),
];
