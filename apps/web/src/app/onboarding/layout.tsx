import { getMyStatusServer } from '@repo/api-client';
import OnboardingLayoutClient from './OnboardingLayoutClient';
import { OnboardingProvider } from './_contexts/OnboardingContext';

async function safeGetMyStatus() {
  try {
    return await getMyStatusServer();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버에서 커플 상태 미리 조회
  const coupleStatus = await safeGetMyStatus();

  return (
    <OnboardingProvider>
      <OnboardingLayoutClient initialCoupleStatus={coupleStatus}>
        {children}
      </OnboardingLayoutClient>
    </OnboardingProvider>
  );
}
