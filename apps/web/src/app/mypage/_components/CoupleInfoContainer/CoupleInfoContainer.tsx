import { Suspense } from 'react';
import ProfileContainer from './_components/ProfileContainer/ProfileContainer';
import LoveIcon from './_components/LoveIcon/LoveIcon';
import CoupleInfoFallback from './_components/CoupleInfoFallback/CoupleInfoFallback';
import styles from './CoupleInfoContainer.module.css';

export default function CoupleInfoContainer() {
  return (
    <Suspense fallback={<CoupleInfoFallback />}>
      <section className={styles.wrapper}>
        <ProfileContainer isMe />
        <LoveIcon />
        <ProfileContainer />
      </section>
    </Suspense>
  );
}
