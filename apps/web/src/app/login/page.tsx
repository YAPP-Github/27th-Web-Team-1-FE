'use client';

import { clearUserIdCookie, getUserIdFromCookie, setUserIdCookie } from '@/auth/cookies';
import Button from '@/components/buttons/button/Button';
import Input from '@/components/input/Input';
import { ROUTES } from '@/constants/routes';
import { login } from '@repo/api-client';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import * as S from './page.styles';

const requestLogin = async (email: string) => {
  const response = await login({ email: email.trim() });
  const userId = response.userId;

  if (userId === undefined || userId === null) {
    throw new Error('응답에서 userId를 찾을 수 없습니다.');
  }

  return userId;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    setUserId(getUserIdFromCookie());
  }, []);

  const isReady = email.trim().length > 0 && !isSubmitting;

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const receivedUserId = await requestLogin(email.trim());
      setUserIdCookie(receivedUserId);
      setUserId(receivedUserId);
      router.push(ROUTES.HOME);
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  const handleLogout = () => {
    clearUserIdCookie();
    setUserId(null);
  };

  return (
    <S.Container>
      <S.Card>
        <div>
          <S.Title>임시 로그인</S.Title>
        </div>
        <S.Form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="example@email.com"
            showCharCount={false}
            errorMessage={errorMessage ?? undefined}
          />
          <S.Footer>
            <Button
              text={isSubmitting ? '로그인 중...' : '로그인'}
              onClick={handleLogin}
              disabled={!isReady}
            />
            {userId && (
              <>
                <S.Helper tone="muted">현재 저장된 userId: {userId}</S.Helper>
                <Button text="로그아웃" onClick={handleLogout} variant="secondary" />
              </>
            )}
          </S.Footer>
        </S.Form>
      </S.Card>
    </S.Container>
  );
}
