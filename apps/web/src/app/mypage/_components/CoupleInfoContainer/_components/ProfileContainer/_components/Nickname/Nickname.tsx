'use client';

import { useGetMyPageSuspense } from '@repo/api-client';
import styles from './Nickname.module.css';

export default function Nickname() {
  const { data } = useGetMyPageSuspense();

  return <span className={styles.text}>{data.partnerName ?? ''}</span>;
}
