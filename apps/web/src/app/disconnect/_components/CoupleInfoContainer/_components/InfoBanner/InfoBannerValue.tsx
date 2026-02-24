import { cache } from 'react';
import { getMyPageServer } from '@repo/api-client';
import { RECONNECTION_DAYS } from '@/app/disconnect/constants';
import styles from './InfoBanner.module.css';

const getMyPageData = cache(() => getMyPageServer());

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};

type ValueType = 'connectionPeriod' | 'photoCount' | 'reconnectionPeriod';

export default async function InfoBannerValue({ type }: { type: ValueType }) {
  const data = await getMyPageData();

  const today = new Date();
  const todayStr = formatDate(today);

  const reconnectionEnd = new Date(today);
  reconnectionEnd.setDate(reconnectionEnd.getDate() + RECONNECTION_DAYS);

  const values: Record<ValueType, string> = {
    connectionPeriod: data.firstMetDate
      ? `${data.firstMetDate.replaceAll('-', '.')} - ${todayStr}`
      : '-',
    photoCount: `${(data.couplePhotoCount ?? 0).toLocaleString('ko-KR')}개`,
    reconnectionPeriod: `${todayStr} - ${formatDate(reconnectionEnd)}`,
  };

  return <span className={styles.value}>{values[type]}</span>;
}
