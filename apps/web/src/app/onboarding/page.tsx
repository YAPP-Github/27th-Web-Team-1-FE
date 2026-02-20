'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import * as S from './page.styles';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(ROUTES.ONBOARDING.PROFILE);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <S.Wrapper>
      <S.Content>
        <S.Title>만나서 반가워요!</S.Title>
      </S.Content>
    </S.Wrapper>
  );
}
