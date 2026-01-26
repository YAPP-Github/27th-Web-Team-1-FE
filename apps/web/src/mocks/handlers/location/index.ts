import { createHandler } from '@/mocks/createHandler';
import { mockGetAddress } from './getAddress/mockGetAddress';

const validateCoordinates = (request: Request): string | null => {
  const url = new URL(request.url);
  const longitude = url.searchParams.get('longitude');
  const latitude = url.searchParams.get('latitude');

  if (!longitude || !latitude) {
    return '좌표_누락';
  }
  return null;
};

export const locationHandlers = [
  createHandler(mockGetAddress, '주소_조회_성공', validateCoordinates),
];
