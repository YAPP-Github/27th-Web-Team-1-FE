import { createHandler } from '@/mocks/createHandler';
import { mockUpdateFirstMetDate } from './updateFirstMetDate/mockUpdateFirstMetDate';

export const couplesHandlers = [createHandler(mockUpdateFirstMetDate, '날짜_수정_성공')];
