import { Suspense } from 'react';
import Skeleton from '@/components/common/skeleton/Skeleton';
import PartnerName from './PartnerName';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <h2 className={styles.title}>
      <Suspense
        fallback={
          <Skeleton
            width={40}
            height={24}
            borderRadius={12}
            className={styles.inlineSkeleton}
          />
        }
      >
        <PartnerName />
      </Suspense>
      님과의 연결을 끊으시겠어요?
    </h2>
  );
}
