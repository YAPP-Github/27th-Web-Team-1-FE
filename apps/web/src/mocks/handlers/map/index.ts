import { createHandler } from '@/mocks/createHandler';
import { mockSearchPlaces } from './searchPlaces/mockSearchPlaces';

const validateQuery = (request: Request): string | null => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return '검색어_누락';
  }
  return null;
};

export const mapHandlers = [
  createHandler(mockSearchPlaces, '장소_검색_성공', validateQuery),
];
