import { createHandler } from '@/mocks/createHandler';
import { getSelectableAlbumsHandler } from './getSelectableAlbums/handler';
import { mockUpdateAlbumTitle } from './updateAlbumTitle/mockUpdateAlbumTitle';
import { mockDeleteAlbum } from './deleteAlbum/mockDeleteAlbum';

export const albumsHandlers = [
  getSelectableAlbumsHandler,
  createHandler(mockUpdateAlbumTitle, '앨범_제목_수정_성공'),
  createHandler(mockDeleteAlbum, '앨범_삭제_성공'),
];
