import { createHandler } from '@/mocks/createHandler';
import { mockDisconnect } from './disconnect/mockDisconnect';
import { mockUpdateFirstMetDate } from './updateFirstMetDate/mockUpdateFirstMetDate';

export const couplesHandlers = [
  createHandler(mockDisconnect, '연결_끊기_성공'),
  createHandler(mockUpdateFirstMetDate, '날짜_수정_성공'),
];
