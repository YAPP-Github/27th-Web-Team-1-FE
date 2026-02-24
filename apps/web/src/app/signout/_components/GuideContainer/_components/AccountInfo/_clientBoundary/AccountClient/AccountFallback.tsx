import Skeleton from '@/components/common/skeleton/Skeleton';
import styles from '../../AccountInfo.module.css';

export default function AccountFallback() {
  return (
    <div className={styles.box}>
      <Skeleton width={180} height={16} borderRadius={4} />
      <Skeleton width={20} height={20} borderRadius="50%" />
    </div>
  );
}
