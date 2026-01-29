import { createHandler } from '@/mocks/createHandler';
import { mockGetSelectableAlbums } from './getSelectableAlbums/mockGetSelectableAlbums';

export const albumsHandlers = [
  createHandler(mockGetSelectableAlbums, '선택_가능_앨범_조회_성공'),
];
