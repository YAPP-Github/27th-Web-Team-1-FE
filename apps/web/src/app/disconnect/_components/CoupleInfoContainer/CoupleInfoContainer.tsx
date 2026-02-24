import { Suspense } from 'react';
import Intro from './_components/Intro/Intro';
import InfoBanner from './_components/InfoBanner/InfoBanner';
import styles from './CoupleInfoContainer.module.css';

export default function CoupleInfoContainer() {
  return (
    <section className={styles.wrapper}>
      <Suspense>
        <Intro />
        <InfoBanner />
      </Suspense>
    </section>
  );
}
