import { albumsHandlers } from './albums';
import { locationHandlers } from './location';
import { mapHandlers } from './map';
import { mypageHandlers } from './mypage';
import { photosHandlers } from './photos';
import { usersHandlers } from './users';

export const customHandlers = [
  ...albumsHandlers,
  ...locationHandlers,
  ...mapHandlers,
  ...mypageHandlers,
  ...photosHandlers,
  ...usersHandlers,
];
