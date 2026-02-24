import { Suspense } from 'react';
import TextareaClient from './_clientBoundary/TextareaClient/TextareaClient';
import TextareaFallback from './_clientBoundary/TextareaClient/TextareaFallback';
import styles from './CommentContainer.module.css';

export default function CommentContainer() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>로킷 팀에게 하고 싶은 말을 적어주세요.</h2>
      <Suspense fallback={<TextareaFallback />}>
        <TextareaClient />
      </Suspense>
    </section>
  );
}
