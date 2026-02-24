import styles from './ConfirmFallback.module.css';

export default function ConfirmFallback() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle} />
      <div className={styles.label} />
    </div>
  );
}
