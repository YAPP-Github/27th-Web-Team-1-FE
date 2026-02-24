import { Suspense } from 'react';
import DdayBannerClient from './_clientBoundary/DdayBannerClient/DdayBannerClient';
import DdayEmptyBannerClient from './_clientBoundary/DdayBannerClient/DdayEmptyBannerClient';
import TotalPhotoCountBannerClient from './_clientBoundary/TotalPhotoCountBannerClient/TotalPhotoCountBannerClient';
import BannerFallback from './_components/BannerFallback/BannerFallback';
import styles from './BannerContainer.module.css';

export default function BannerContainer() {
  return (
    <section className={styles.wrapper}>
      <Suspense fallback={<BannerFallback />}>
        <DdayBannerClient />
      </Suspense>
      <DdayEmptyBannerClient />
      <Suspense fallback={<BannerFallback />}>
        <TotalPhotoCountBannerClient />
      </Suspense>
    </section>
  );
}
