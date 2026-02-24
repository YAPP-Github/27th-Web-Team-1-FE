import { albumsHandlers } from './albums';
import { authHandlers } from './auth';
import { couplesHandlers } from './couples';
import { locationHandlers } from './location';
import { mapHandlers } from './map';
import { mypageHandlers } from './mypage';
import { photosHandlers } from './photos';
import { usersHandlers } from './users';

export const customHandlers = [
  ...albumsHandlers,
  ...authHandlers,
  ...couplesHandlers,
  ...locationHandlers,
  ...mapHandlers,
  ...mypageHandlers,
  ...photosHandlers,
  ...usersHandlers,
];
