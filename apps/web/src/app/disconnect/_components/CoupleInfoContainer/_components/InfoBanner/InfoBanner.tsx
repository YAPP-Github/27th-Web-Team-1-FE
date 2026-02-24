import { Suspense, Fragment } from 'react';
import Skeleton from '@/components/common/skeleton/Skeleton';
import InfoBannerValue from './InfoBannerValue';
import styles from './InfoBanner.module.css';

const ROWS = [
  { label: '연결한 기간', type: 'connectionPeriod' },
  { label: 'LOKIT에 업로드된 총 사진 개수', type: 'photoCount' },
  { label: '재연결 할 수 있는 기간', type: 'reconnectionPeriod' },
] as const;

export default function InfoBanner() {
  return (
    <div className={styles.wrapper}>
      {ROWS.map((row, index) => (
        <Fragment key={row.type}>
          {index > 0 && <div className={styles.bar} />}
          <div className={styles.row}>
            <span className={styles.label}>{row.label}</span>
            <Suspense fallback={<Skeleton width={200} height={29} borderRadius={4} />}>
              <InfoBannerValue type={row.type} />
            </Suspense>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
