'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/buttons/button/Button';
import Input from '@/components/input/Input';
import * as S from './page.styles';
import { clearUserIdCookie, getUserIdFromCookie, setUserIdCookie } from '@/auth/cookies';

type LoginApiResponse = {
  code: number;
  message: string;
  data?: {
    userId?: number;
  };
};

const resolveLoginUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
  return baseUrl ? `${baseUrl}/auth/login` : '/auth/login';
};

const requestLogin = async (email: string) => {
  const response = await fetch(resolveLoginUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  let payload: LoginApiResponse | null = null;
  try {
    payload = (await response.json()) as LoginApiResponse;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.message ?? '로그인에 실패했습니다.';
    throw new Error(message);
  }

  const userId = payload?.data?.userId;
  if (!userId) {
    throw new Error('응답에서 userId를 찾을 수 없습니다.');
  }

  return userId;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(() => getUserIdFromCookie());

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
      router.push('/map');
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
              type="submit"
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
