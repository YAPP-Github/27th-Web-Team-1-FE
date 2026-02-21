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
    if (!initialCoupleStatus) {
      return;
    }

    // 이미 커플 연결 완료된 경우 홈으로
    if (initialCoupleStatus.isCoupled) {
      router.replace(ROUTES.HOME);
      return;
    }

    // 경로별 가드 로직
    // profile 완료 전 connect 접근 금지
    if (pathname === ROUTES.ONBOARDING.CONNECT && !completedSteps.profile) {
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
