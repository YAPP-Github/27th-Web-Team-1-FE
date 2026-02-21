'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { ONBOARDING_START_REDIRECT_DELAY } from '@/constants/onboarding';
import * as S from './page.styles';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(ROUTES.ONBOARDING.PROFILE);
    }, ONBOARDING_START_REDIRECT_DELAY);

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
