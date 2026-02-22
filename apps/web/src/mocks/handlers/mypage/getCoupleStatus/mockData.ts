import type { CoupleStatusResponse } from '@repo/api-client';

export const 커플_상태_조회_연결됨: CoupleStatusResponse = {
  isCoupled: true,
  partnerSummary: {
    userId: 1,
    nickname: '테스트파트너',
    profileImageUrl: 'https://picsum.photos/200/200?random=100',
  },
};

export const 커플_상태_조회_미연결: CoupleStatusResponse = {
  isCoupled: false,
  partnerSummary: undefined,
};
