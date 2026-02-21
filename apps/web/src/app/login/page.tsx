'use client';

import KakaoIcon from '@/assets/images/kakao.svg';
import { API_URL } from '@/constants/apiUrl';
import * as S from './page.styles';
import OnboardingCarousel from './_components/loginCarousel/OnboardingCarousel';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${apiBaseUrl}${API_URL.AUTH.KAKAO}`;
  };

  return (
    <S.Wrapper>
      <OnboardingCarousel />
      <S.ButtonWrapper>
        <S.KakaoButton onClick={handleKakaoLogin}>
          <KakaoIcon width={16} height={16} />
          <span>카카오로 시작하기</span>
        </S.KakaoButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
