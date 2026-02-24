import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';

export const mockWithdraw = {
  url: API_URL.USERS.ME,
  description: '회원 탈퇴',
  method: 'delete',
  response: {
    회원_탈퇴_성공: {
      status: 204,
      delayTime: 300,
      data: {},
    },
    커플_미해제_에러: {
      status: 400,
      delayTime: 300,
      data: {
        code: 400,
        message: '커플 연결을 먼저 끊어주세요.',
        data: {
          errorCode: 'COUPLE_NOT_DISCONNECTED',
          detail: '탈퇴 전 커플 연결 끊기가 필요합니다.',
          instance: '/users/me',
        },
      },
    },
  },
} satisfies MockApiResponse<'회원_탈퇴_성공' | '커플_미해제_에러', unknown>;
