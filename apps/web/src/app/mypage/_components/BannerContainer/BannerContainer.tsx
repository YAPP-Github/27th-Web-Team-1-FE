import DdayBannerClient from './_clientBoundary/DdayBannerClient/DdayBannerClient';
import TotalPhotoCountBannerClient from './_clientBoundary/TotalPhotoCountBannerClient/TotalPhotoCountBannerClient';
import styles from './BannerContainer.module.css';

export default function BannerContainer() {
  return (
    <section className={styles.wrapper}>
      <DdayBannerClient />
      <TotalPhotoCountBannerClient />
    </section>
  );
}
