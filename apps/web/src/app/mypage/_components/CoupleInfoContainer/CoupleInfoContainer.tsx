import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { COUPLE_STATUS_COOKIE } from '@/constants/cookie';
import { COUPLE_STATUS } from '@/constants/coupleStatus';
import ProfileContainer from './_components/ProfileContainer/ProfileContainer';
import LoveIcon from './_components/LoveIcon/LoveIcon';
import CoupleInfoFallback from './_components/CoupleInfoFallback/CoupleInfoFallback';
import styles from './CoupleInfoContainer.module.css';

export default async function CoupleInfoContainer() {
  const cookieStore = await cookies();
  const isCoupled =
    cookieStore.get(COUPLE_STATUS_COOKIE)?.value === COUPLE_STATUS.COUPLED;

  return (
    <Suspense fallback={<CoupleInfoFallback isCoupled={isCoupled} />}>
      <section className={styles.wrapper}>
        <ProfileContainer isMe />
        {isCoupled && (
          <>
            <LoveIcon />
            <ProfileContainer />
          </>
        )}
      </section>
    </Suspense>
  );
}
