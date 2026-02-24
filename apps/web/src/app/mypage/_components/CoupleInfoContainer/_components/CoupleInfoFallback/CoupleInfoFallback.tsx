import Skeleton from '@/components/common/skeleton/Skeleton';
import styles from './CoupleInfoFallback.module.css';

interface CoupleInfoFallbackProps {
  isCoupled: boolean;
}

export default function CoupleInfoFallback({ isCoupled }: CoupleInfoFallbackProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.profile}>
        <Skeleton width={90} height={90} borderRadius="50%" />
        <Skeleton width={40} height={16} borderRadius={4} />
      </div>
      {isCoupled && (
        <>
          <div className={styles.heart} />
          <div className={styles.profile}>
            <Skeleton width={90} height={90} borderRadius="50%" />
            <Skeleton width={40} height={16} borderRadius={4} />
          </div>
        </>
      )}
    </section>
  );
}
