import { locationHandlers } from './location';
import { photosHandlers } from './photos';

export const customHandlers = [...locationHandlers, ...photosHandlers];
