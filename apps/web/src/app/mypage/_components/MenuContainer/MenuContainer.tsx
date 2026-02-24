import ReconnectClient from './_clientBoundary/ReconnectClient/ReconnectClient';
import DisconnectClient from './_clientBoundary/DisconnectClient/DisconnectClient';
import styles from './MenuContainer.module.css';

interface MenuContainerProps {
  isCoupled: boolean;
}

export default function MenuContainer({ isCoupled }: MenuContainerProps) {
  return (
    <section className={styles.wrapper}>
      {!isCoupled && <ReconnectClient />}
      <DisconnectClient />
    </section>
  );
}
