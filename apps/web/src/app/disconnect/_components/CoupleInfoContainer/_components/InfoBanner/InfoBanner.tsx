'use client';

import { Fragment } from 'react';
import { useGetMyPageSuspense } from '@repo/api-client';
import styles from './InfoBanner.module.css';

export default function InfoBanner() {
  const { data } = useGetMyPageSuspense();

  const photoCount = (data.couplePhotoCount ?? 0).toLocaleString('ko-KR');

  const rows = [
    { label: '연결한 기간', value: '-' },
    { label: 'LOKIT에 업로드된 총 사진 갯수', value: `${photoCount}개` },
    { label: '재연결 할 수 있는 기간', value: '-' },
  ];

  return (
    <div className={styles.wrapper}>
      {rows.map((row, index) => (
        <Fragment key={row.label}>
          {index > 0 && <div className={styles.bar} />}
          <div className={styles.row}>
            <span className={styles.label}>{row.label}</span>
            <span className={styles.value}>{row.value}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
