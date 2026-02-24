'use client';

import { useCallback } from 'react';
import { useGetMyPage } from '@repo/api-client';
import { useReconnectInviteCode } from '../../_hooks/useReconnectInviteCode';
import { KAKAO_TEMPLATE_ID } from '@/constants/kakao';
import KakaoSvg from '@/assets/images/kakao.svg';
import * as S from './KakaoShareClient.styles';

export default function KakaoShareClient() {
  const { data: myPageData } = useGetMyPage();
  const { inviteCode } = useReconnectInviteCode();

  const handleShareKakao = useCallback(() => {
    const kakao = window.Kakao;
    if (kakao && inviteCode?.code) {
      try {
        const isDev = process.env.NODE_ENV === 'development';
        const templateId = isDev ? KAKAO_TEMPLATE_ID.DEV : KAKAO_TEMPLATE_ID.PROD;

        if (!templateId) {
          console.error('카카오톡 템플릿 ID가 설정되지 않았습니다.');
          return;
        }

        kakao.Share.sendCustom({
          templateId: templateId,
          templateArgs: {
            userName: myPageData?.myName || '사용자',
            inviteCode: inviteCode.code || '000000',
            link: window.location.origin,
          },
        });
      } catch (error) {
        console.error('카카오톡 공유 실패:', error);
      }
    }
  }, [inviteCode?.code, myPageData?.myName]);

  return (
    <S.KakaoShareButton onClick={handleShareKakao}>
      <S.KakaoIcon>
        <KakaoSvg />
      </S.KakaoIcon>
      카카오톡으로 공유하기
    </S.KakaoShareButton>
  );
}
