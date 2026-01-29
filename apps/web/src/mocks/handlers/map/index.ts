import { createHandler } from '@/mocks/createHandler';
import { mockSearchPlaces } from './searchPlaces/mockSearchPlaces';
import { mockGetMapPhotosHandler } from './getMapPhotos/mockGetMapPhotos';

const validateQuery = (request: Request): string | null => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return '검색어_누락';
  }
  return null;
};

export const mapHandlers = [
  mockGetMapPhotosHandler,
  createHandler(mockSearchPlaces, '장소_검색_성공', validateQuery),
];
