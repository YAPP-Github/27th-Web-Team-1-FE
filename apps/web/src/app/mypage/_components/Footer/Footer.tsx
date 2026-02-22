import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <button className={styles.footerButton}>로그아웃</button>
      <span className={styles.divider} />
      <button className={styles.footerButton}>탈퇴하기</button>
    </footer>
  );
}
