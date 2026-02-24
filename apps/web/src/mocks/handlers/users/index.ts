import { createHandler } from '@/mocks/createHandler';
import { mockWithdraw } from './withdraw/mockWithdraw';

const validateWithdraw = (request: Request): string | null => {
  if (request.headers.get('x-mock-error') === 'COUPLE_NOT_DISCONNECTED') {
    return '커플_미해제_에러';
  }
  return null;
};

export const usersHandlers = [
  createHandler(mockWithdraw, '회원_탈퇴_성공', validateWithdraw),
];
