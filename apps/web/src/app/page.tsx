import { ExampleCard } from '@/components/ExampleCard';
import styles from './page.module.css';

export default function Home() {
  return (
    <section className={styles.page}>
      <ExampleCard />
    </section>
  );
}
