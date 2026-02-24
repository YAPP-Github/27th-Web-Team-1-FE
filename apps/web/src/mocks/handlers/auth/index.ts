import { createHandler } from '@/mocks/createHandler';
import { mockLogout } from './logout/mockLogout';

export const authHandlers = [createHandler(mockLogout, '로그아웃_성공')];
