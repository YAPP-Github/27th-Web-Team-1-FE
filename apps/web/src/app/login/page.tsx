'use client';

import Button from '@/components/buttons/button/Button';
import { API_URL } from '@/constants/apiUrl';
import * as S from './page.styles';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${apiBaseUrl}${API_URL.AUTH.KAKAO}`;
  };

  return (
    <S.Container>
      <S.Card>
        <div>
          <S.Title>로그인</S.Title>
        </div>
        <S.Footer>
          <Button text="카카오로 시작하기" onClick={handleKakaoLogin} />
        </S.Footer>
      </S.Card>
    </S.Container>
  );
}
