'use client';

import { useGetMyPageSuspense } from '@repo/api-client';
import styles from './Intro.module.css';

export default function Intro() {
  const { data } = useGetMyPageSuspense();

  return (
    <h2 className={styles.title}>
      {data.partnerName ?? '상대방'}님과의 연결을 끊으시겠어요?
    </h2>
  );
}
