import ConfirmClient from './_clientBoundary/ConfirmClient/ConfirmClient';
import SignoutButtonClient from './_clientBoundary/SignoutButtonClient/SignoutButtonClient';
import styles from './CtaContainer.module.css';

export default function CtaContainer() {
  return (
    <section className={styles.wrapper}>
      <ConfirmClient />
      <SignoutButtonClient />
    </section>
  );
}
