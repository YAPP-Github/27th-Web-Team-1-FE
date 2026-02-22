import DdayBannerClient from './_clientBoundary/DdayBannerClient/DdayBannerClient';
import TotalPhotoCountBanner from './_components/TotalPhotoCountBanner/TotalPhotoCountBanner';
import styles from './BannerContainer.module.css';

export default function BannerContainer() {
  return (
    <section className={styles.wrapper}>
      <DdayBannerClient />
      <TotalPhotoCountBanner />
    </section>
  );
}
