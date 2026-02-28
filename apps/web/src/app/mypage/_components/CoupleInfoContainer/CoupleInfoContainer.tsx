import { Suspense } from 'react';
import ProfileContainer from './_components/ProfileContainer/ProfileContainer';
import LoveIcon from './_components/LoveIcon/LoveIcon';
import CoupleInfoFallback from './_components/CoupleInfoFallback/CoupleInfoFallback';
import styles from './CoupleInfoContainer.module.css';

interface CoupleInfoContainerProps {
  isCoupled: boolean;
}

export default function CoupleInfoContainer({ isCoupled }: CoupleInfoContainerProps) {
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
