import { createHandler } from '@/mocks/createHandler';
import { mockGetCoupleStatus } from './getCoupleStatus/mockGetCoupleStatus';

export const mypageHandlers = [
  createHandler(mockGetCoupleStatus, '커플_상태_조회_연결됨'),
];
