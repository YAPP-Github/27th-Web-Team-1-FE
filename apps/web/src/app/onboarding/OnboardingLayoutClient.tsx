'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { CoupleStatusResponse } from '@repo/api-client';
import { ROUTES } from '@/constants/routes';
import { useOnboardingContext } from './_contexts/OnboardingContext';

export default function OnboardingLayoutClient({
  children,
  initialCoupleStatus,
}: {
  children: React.ReactNode;
  initialCoupleStatus?: CoupleStatusResponse | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { completedSteps } = useOnboardingContext();

  useEffect(() => {
    // 경로별 가드 로직
    // profile 완료 전 connect 접근 금지 (기존 사용자는 이미 프로필이 있으므로 스킵)
    if (
      pathname === ROUTES.ONBOARDING.CONNECT &&
      !completedSteps.profile &&
      !initialCoupleStatus
    ) {
      router.replace(ROUTES.ONBOARDING.PROFILE);
      return;
    }

    // connect 완료 전 verify 접근 금지
    if (pathname === ROUTES.ONBOARDING.VERIFY && !completedSteps.connect) {
      router.replace(ROUTES.ONBOARDING.CONNECT);
      return;
    }
  }, [pathname, initialCoupleStatus, completedSteps, router]);

  return <div>{children}</div>;
}
