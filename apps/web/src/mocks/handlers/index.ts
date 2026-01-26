import { albumsHandlers } from './albums';
import { locationHandlers } from './location';
import { mapHandlers } from './map';
import { photosHandlers } from './photos';

export const customHandlers = [
  ...albumsHandlers,
  ...locationHandlers,
  ...mapHandlers,
  ...photosHandlers,
];
