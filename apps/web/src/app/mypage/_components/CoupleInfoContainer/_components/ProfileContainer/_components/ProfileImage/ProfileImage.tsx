'use client';

import { useGetMyPageSuspense } from '@repo/api-client';
import styles from './ProfileImage.module.css';

export default function ProfileImage() {
  const { data } = useGetMyPageSuspense();
  const profileUrl = data.partnerProfileImageUrl;

  return (
    <div className={styles.wrapper}>
      {profileUrl ? (
        <img className={styles.image} src={profileUrl} alt="프로필 이미지" />
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  );
}
