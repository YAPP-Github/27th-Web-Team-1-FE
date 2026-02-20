'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetMyStatus } from '@repo/api-client';
import { useOnboardingContext } from './_contexts/OnboardingContext';

export default function OnboardingLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: coupleStatus, isLoading } = useGetMyStatus();
  const { completedSteps } = useOnboardingContext();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // 이미 커플 연결 완료된 경우 홈으로
    if (coupleStatus?.coupled) {
      router.replace('/');
      return;
    }

    // 경로별 가드 로직
    const currentPath = pathname;

    // profile 완료 전 connect 접근 금지
    if (currentPath.includes('/connect') && !completedSteps.profile) {
      router.replace('/onboarding/profile');
      return;
    }

    // connect 완료 전 verify 접근 금지
    if (currentPath.includes('/verify') && !completedSteps.connect) {
      router.replace('/onboarding/connect');
      return;
    }
  }, [pathname, coupleStatus, completedSteps, isLoading, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      />
    );
  }

  return <div key={pathname}>{children}</div>;
}
