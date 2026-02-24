import SelectListClient from './_clientBoundary/SelectListClient/SelectListClient';
import styles from './ReasonContainer.module.css';

export default function ReasonContainer() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>
        탈퇴 사유 <span className={styles.required}>*</span>
      </h2>
      <SelectListClient />
    </section>
  );
}
