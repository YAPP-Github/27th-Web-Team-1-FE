import styles from './SelectListFallback.module.css';

const LABEL_WIDTHS = [120, 140, 130, 40];

export default function SelectListFallback() {
  return (
    <div className={styles.list}>
      {LABEL_WIDTHS.map((width, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.circle} />
          <div className={styles.label} style={{ width }} />
        </div>
      ))}
    </div>
  );
}
