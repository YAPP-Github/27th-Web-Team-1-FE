import LogoutClient from './_clientBoundary/LogoutClient/LogoutClient';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <LogoutClient />
      <span className={styles.divider} />
      <button type="button" className={styles.footerButton}>
        회원 탈퇴
      </button>
    </footer>
  );
}
