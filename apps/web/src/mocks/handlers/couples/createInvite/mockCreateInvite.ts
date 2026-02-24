import type { InviteCodeResponse } from '@repo/api-client';
import { API_URL } from '@/constants';
import type { MockApiResponse } from '@/mocks/types';
import { 초대코드_생성_성공_데이터 } from './mockData';

export const mockCreateInvite = {
  url: API_URL.COUPLES.INVITES,
  description: '초대코드 생성',
  method: 'post',
  response: {
    초대코드_생성_성공: {
      status: 200,
      delayTime: 300,
      data: 초대코드_생성_성공_데이터,
    },
  },
} satisfies MockApiResponse<'초대코드_생성_성공', InviteCodeResponse>;
