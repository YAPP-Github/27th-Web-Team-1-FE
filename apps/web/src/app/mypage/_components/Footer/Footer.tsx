import LogoutClient from './_clientBoundary/LogoutClient/LogoutClient';
import SignoutClient from './_clientBoundary/SignoutClient/SignoutClient';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <LogoutClient />
      <span className={styles.divider} />
      <SignoutClient />
    </footer>
  );
}
