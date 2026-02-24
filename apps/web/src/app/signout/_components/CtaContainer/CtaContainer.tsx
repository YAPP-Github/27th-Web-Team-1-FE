import { Suspense } from 'react';
import ConfirmClient from './_clientBoundary/ConfirmClient/ConfirmClient';
import ConfirmFallback from './_clientBoundary/ConfirmClient/ConfirmFallback';
import SignoutButtonClient from './_clientBoundary/SignoutButtonClient/SignoutButtonClient';
import SignoutButtonFallback from './_clientBoundary/SignoutButtonClient/SignoutButtonFallback';
import styles from './CtaContainer.module.css';

export default function CtaContainer() {
  return (
    <section className={styles.wrapper}>
      <Suspense fallback={<ConfirmFallback />}>
        <ConfirmClient />
      </Suspense>
      <Suspense fallback={<SignoutButtonFallback />}>
        <SignoutButtonClient />
      </Suspense>
    </section>
  );
}
