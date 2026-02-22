import DdayBannerClient from './_clientBoundary/DdayBannerClient/DdayBannerClient';
import TotalPhotoCountBannerClient from './_clientBoundary/TotalPhotoCountBannerClient/TotalPhotoCountBannerClient';
import styles from './BannerContainer.module.css';

export default function BannerContainer() {
  return (
    <section className={styles.wrapper}>
      {/* TODO: API 연동 후 실제 데이터로 교체 */}
      <DdayBannerClient dday={100} />
      {/* TODO: API 연동 후 실제 photoUrl로 교체 */}
      <TotalPhotoCountBannerClient
        totalPhotoCount={128}
        photoUrl="https://picsum.photos/400/200"
      />
    </section>
  );
}
