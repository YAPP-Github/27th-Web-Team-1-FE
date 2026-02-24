import { Suspense } from 'react';
import DdayBannerClient from './_clientBoundary/DdayBannerClient/DdayBannerClient';
import DdayEmptyBannerClient from './_clientBoundary/DdayBannerClient/DdayEmptyBannerClient';
import TotalPhotoCountBannerClient from './_clientBoundary/TotalPhotoCountBannerClient/TotalPhotoCountBannerClient';
import BannerFallback from './_components/BannerFallback/BannerFallback';
import styles from './BannerContainer.module.css';

interface BannerContainerProps {
  hasDday: boolean;
}

export default function BannerContainer({ hasDday }: BannerContainerProps) {
  return (
    <section className={styles.wrapper}>
      {hasDday ? (
        <Suspense fallback={<BannerFallback />}>
          <DdayBannerClient />
        </Suspense>
      ) : (
        <DdayEmptyBannerClient />
      )}
      <Suspense fallback={<BannerFallback />}>
        <TotalPhotoCountBannerClient />
      </Suspense>
    </section>
  );
}
