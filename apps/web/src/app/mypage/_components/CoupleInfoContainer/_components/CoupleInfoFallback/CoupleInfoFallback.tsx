import Skeleton from '@/components/common/skeleton/Skeleton';
import styles from './CoupleInfoFallback.module.css';

export default function CoupleInfoFallback() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.profile}>
        <Skeleton width={90} height={90} borderRadius="50%" />
        <Skeleton width={40} height={16} borderRadius={4} />
      </div>
      <div className={styles.heart} />
      <div className={styles.profile}>
        <Skeleton width={90} height={90} borderRadius="50%" />
        <Skeleton width={40} height={16} borderRadius={4} />
      </div>
    </section>
  );
}
