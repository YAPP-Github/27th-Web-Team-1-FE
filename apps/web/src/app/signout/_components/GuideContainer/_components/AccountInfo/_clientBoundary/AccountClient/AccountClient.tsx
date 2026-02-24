'use client';

import { useGetMyPageSuspense } from '@repo/api-client';
import KakaoIcon from '@/assets/images/kakao.svg';
import styles from '../../AccountInfo.module.css';

export default function AccountClient() {
  const { data } = useGetMyPageSuspense();

  return (
    <div className={styles.box}>
      <span className={styles.email}>{data.myEmail}</span>
      <div className={styles.kakaoCircle}>
        <KakaoIcon width={9} height={9} />
      </div>
    </div>
  );
}
