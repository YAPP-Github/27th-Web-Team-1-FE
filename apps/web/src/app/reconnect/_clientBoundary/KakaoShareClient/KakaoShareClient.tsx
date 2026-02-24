'use client';

import { useCallback } from 'react';
import { useGetMyPage } from '@repo/api-client';
import { KAKAO_TEMPLATE_ID } from '@/constants/kakao';
import KakaoSvg from '@/assets/images/kakao.svg';
import * as S from './KakaoShareClient.styles';

interface KakaoShareClientProps {
  inviteCode: string | null;
}

export default function KakaoShareClient({ inviteCode }: KakaoShareClientProps) {
  const { data: myPageData } = useGetMyPage();

  const handleShareKakao = useCallback(() => {
    const kakao = window.Kakao;
    if (kakao && inviteCode) {
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
            inviteCode: inviteCode,
            link: window.location.origin,
          },
        });
      } catch (error) {
        console.error('카카오톡 공유 실패:', error);
      }
    }
  }, [inviteCode, myPageData]);

  return (
    <S.KakaoShareButton onClick={handleShareKakao}>
      <S.KakaoIcon>
        <KakaoSvg />
      </S.KakaoIcon>
      카카오톡으로 공유하기
    </S.KakaoShareButton>
  );
}
