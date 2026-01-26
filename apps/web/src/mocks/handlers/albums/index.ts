import { createHandler } from '@/mocks/createHandler';
import { mockGetSelectableAlbums } from './getSelectableAlbums/mockGetSelectableAlbums';

export const albumsHandlers = [
  createHandler(mockGetSelectableAlbums, '앨범_목록_조회_성공'),
];
