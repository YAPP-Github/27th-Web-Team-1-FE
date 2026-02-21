import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import OnboardingLayoutClient from './OnboardingLayoutClient';
import { OnboardingProvider } from './_contexts/OnboardingContext';
import { ROUTES } from '@/constants/routes';

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버에서 쿠키 확인 (로그인 여부)
  const cookieStore = await cookies();
  const hasAuthCookie = cookieStore.has('accessToken');

  // 로그인 안 되어 있으면 리다이렉트
  if (!hasAuthCookie) {
    redirect(ROUTES.LOGIN);
  }

  // 클라이언트 컴포넌트로 위임 (API 호출 필요)
  return (
    <OnboardingProvider>
      <OnboardingLayoutClient>{children}</OnboardingLayoutClient>
    </OnboardingProvider>
  );
}
