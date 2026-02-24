import type { InviteCodeResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';

const 초대코드_갱신_성공_데이터: InviteCodeResponse = {
  inviteCode: '654321',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export const mockRefreshInvite = {
  url: `${API_URL.COUPLES.INVITES}/refresh`,
  description: '초대코드 갱신',
  method: 'post',
  response: {
    초대코드_갱신_성공: {
      status: 200,
      delayTime: 300,
      data: 초대코드_갱신_성공_데이터,
    },
  },
} satisfies MockApiResponse<'초대코드_갱신_성공', InviteCodeResponse>;
