'use client';

import Button from '@/components/buttons/button/Button';
import * as S from './page.styles';

const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/kakao`;

export default function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>로그인</S.Title>
        <S.Footer>
          <Button text="카카오로 로그인" onClick={handleKakaoLogin} />
        </S.Footer>
      </S.Card>
    </S.Container>
  );
}
