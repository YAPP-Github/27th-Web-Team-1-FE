'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ProfileContainer from './_components/ProfileContainer/ProfileContainer';
import LoveIcon from './_components/LoveIcon/LoveIcon';
import CoupleInfoSkeleton from './_components/CoupleInfoSkeleton/CoupleInfoSkeleton';
import styles from './CoupleInfoContainer.module.css';

export default function CoupleInfoContainer() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallback={<CoupleInfoSkeleton />}>
      <Suspense fallback={<CoupleInfoSkeleton />}>
        <section className={styles.wrapper}>
          <ProfileContainer isMe />
          <LoveIcon />
          <ProfileContainer />
        </section>
      </Suspense>
    </ErrorBoundary>
  );
}
