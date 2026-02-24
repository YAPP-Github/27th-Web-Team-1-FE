import type { InviteCodeResponse } from '@repo/api-client';

export const 초대코드_생성_성공_데이터: InviteCodeResponse = {
  inviteCode: '123456',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};
