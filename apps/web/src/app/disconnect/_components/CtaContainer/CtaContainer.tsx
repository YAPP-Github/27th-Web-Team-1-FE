import ConfirmClient from './_clientBoundary/ConfirmClient/ConfirmClient';
import DisconnectButtonClient from './_clientBoundary/DisconnectButtonClient/DisconnectButtonClient';
import styles from './CtaContainer.module.css';

export default function CtaContainer() {
  return (
    <section className={styles.wrapper}>
      <ConfirmClient />
      <DisconnectButtonClient />
    </section>
  );
}
