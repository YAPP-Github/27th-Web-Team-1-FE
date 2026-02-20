'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useGetMyStatus } from '@repo/api-client';
import { ROUTES } from '@/constants/routes';
import { Container } from './Layout.styles';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // 공개 경로에서는 API 호출 비활성화
  const isPublicPath = pathname === '/login';
  const isOnboardingPath = pathname.startsWith('/onboarding');
  const shouldSkipQuery = isPublicPath || isOnboardingPath;

  const { data: coupleStatus, isLoading } = useGetMyStatus({
    query: { enabled: !shouldSkipQuery } as any,
  });

  // 온보딩 미완료 시 리다이렉트 (onboarding, login 경로는 제외)
  useEffect(() => {
    if (shouldSkipQuery || isLoading) {
      return;
    }

    if (!coupleStatus?.coupled) {
      router.replace(ROUTES.ONBOARDING.START);
    }
  }, [coupleStatus, isLoading, router, shouldSkipQuery]);

  return <Container>{children}</Container>;
}
