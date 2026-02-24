import { Suspense } from 'react';
import AccountDetail from './_components/AccountDetail/AccountDetail';
import AccountFallback from './_clientBoundary/AccountClient/AccountFallback';
import styles from './AccountInfo.module.css';

export default function AccountInfo() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>현재 계정</h2>
      <Suspense fallback={<AccountFallback />}>
        <AccountDetail />
      </Suspense>
    </div>
  );
}
