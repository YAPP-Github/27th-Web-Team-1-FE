import { createHandler } from '@/mocks/createHandler';
import { mockWithdraw } from './withdraw/mockWithdraw';

export const usersHandlers = [createHandler(mockWithdraw, '회원_탈퇴_성공')];
