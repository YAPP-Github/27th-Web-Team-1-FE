import { createHandler } from '@/mocks/createHandler';
import { mockSearchPlaces } from './searchPlaces/mockSearchPlaces';
import { mockGetMapPhotosHandler } from './getMapPhotos/mockGetMapPhotos';
import { mockGetHome } from './getHome/mockGetHome';
import { mockGetMe } from './getMapMe/mockGetMe';
import { mockGetMapAlbums } from './getMapAlbums/mockGetMapAlbums';

const validateQuery = (request: Request): string | null => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return '검색어_누락';
  }
  return null;
};

const validateHomeParams = (request: Request): string | null => {
  const url = new URL(request.url);
  const latitude = url.searchParams.get('latitude');
  const longitude = url.searchParams.get('longitude');

  if (!latitude || !longitude) {
    return '좌표_누락';
  }
  return null;
};

export const mapHandlers = [
  mockGetMapPhotosHandler,
  createHandler(mockGetMe, '지도_ME_조회_성공'),
  createHandler(mockGetMapAlbums, '앨범_지도정보_조회_성공'),
  createHandler(mockSearchPlaces, '장소_검색_성공', validateQuery),
  createHandler(mockGetHome, '홈_조회_성공', validateHomeParams),
];
