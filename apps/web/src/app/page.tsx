'use client';

import Button from '@/components/buttons/button/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <section className={styles.page}>
      <Button text='버튼' onClick={() => {}}/>
    </section>
  );
}
