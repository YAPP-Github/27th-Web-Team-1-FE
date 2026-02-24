export const dynamic = 'force-dynamic';

import OnboardingHeader from '../onboarding/_components/OnboardingHeader/OnboardingHeader';
import InviteCodeClient from './_clientBoundary/InviteCodeClient/InviteCodeClient';
import KakaoShareClient from './_clientBoundary/KakaoShareClient/KakaoShareClient';
import styles from './page.module.css';

export default function ReconnectPage() {
  return (
    <div className={styles.wrapper}>
      <OnboardingHeader />
      <div className={styles.content}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>파트너와 재연결하기</h1>
          <p className={styles.description}>코드를 파트너에게 공유해주세요</p>
        </div>

        <section className={styles.codeSection}>
          <h2 className={styles.sectionTitle}>내 초대 코드</h2>
          <InviteCodeClient />
        </section>
        <KakaoShareClient />
      </div>
    </div>
  );
}
