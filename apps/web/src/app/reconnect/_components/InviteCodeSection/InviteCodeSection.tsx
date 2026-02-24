import { createInviteServer } from '@repo/api-client';
import CopyCodeClient from '../../_clientBoundary/CopyCodeClient/CopyCodeClient';
import KakaoShareClient from '../../_clientBoundary/KakaoShareClient/KakaoShareClient';
import styles from '../../page.module.css';

export default async function InviteCodeSection() {
  const inviteData = await createInviteServer().catch((error) => {
    console.error('[ReconnectPage] createInvite failed:', error);
    return null;
  });

  const inviteCode = inviteData?.inviteCode ?? null;

  return (
    <>
      <section className={styles.codeSection}>
        <h2 className={styles.sectionTitle}>내 초대 코드</h2>
        <div className={styles.codeDisplay}>
          <span>{inviteCode ?? '------'}</span>
          <CopyCodeClient inviteCode={inviteCode} />
        </div>
      </section>
      <KakaoShareClient inviteCode={inviteCode} />
    </>
  );
}
