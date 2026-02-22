import ReconnectClient from './_clientBoundary/ReconnectClient/ReconnectClient';
import DisconnectClient from './_clientBoundary/DisconnectClient/DisconnectClient';
import styles from './MenuContainer.module.css';

export default function MenuContainer() {
  return (
    <section className={styles.wrapper}>
      <ReconnectClient isShow />
      <DisconnectClient />
    </section>
  );
}
