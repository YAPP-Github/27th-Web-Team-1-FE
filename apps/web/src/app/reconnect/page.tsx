export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import OnboardingHeader from '../onboarding/_components/OnboardingHeader/OnboardingHeader';
import CouplePollingClient from './_clientBoundary/CouplePollingClient/CouplePollingClient';
import InviteCodeFallback from './_components/InviteCodeSection/InviteCodeFallback';
import InviteCodeSection from './_components/InviteCodeSection/InviteCodeSection';
import styles from './page.module.css';

export default function ReconnectPage() {
  return (
    <div className={styles.wrapper}>
      <OnboardingHeader />
      <CouplePollingClient />
      <div className={styles.content}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>파트너와 재연결하기</h1>
          <p className={styles.description}>코드를 파트너에게 공유해주세요</p>
        </div>

        <Suspense fallback={<InviteCodeFallback />}>
          <InviteCodeSection />
        </Suspense>
      </div>
    </div>
  );
}
