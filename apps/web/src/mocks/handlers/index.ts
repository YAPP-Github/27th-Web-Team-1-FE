import { albumsHandlers } from './albums';
import { locationHandlers } from './location';
import { photosHandlers } from './photos';

export const customHandlers = [
  ...albumsHandlers,
  ...locationHandlers,
  ...photosHandlers,
];
