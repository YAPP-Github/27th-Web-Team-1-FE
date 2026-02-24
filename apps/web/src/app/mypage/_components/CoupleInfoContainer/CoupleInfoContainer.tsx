'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ProfileContainer from './_components/ProfileContainer/ProfileContainer';
import LoveIcon from './_components/LoveIcon/LoveIcon';
import CoupleInfoFallback from './_components/CoupleInfoFallback/CoupleInfoFallback';
import styles from './CoupleInfoContainer.module.css';

export default function CoupleInfoContainer() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallback={<CoupleInfoFallback />}>
      <Suspense fallback={<CoupleInfoFallback />}>
        <section className={styles.wrapper}>
          <ProfileContainer isMe />
          <LoveIcon />
          <ProfileContainer />
        </section>
      </Suspense>
    </ErrorBoundary>
  );
}
