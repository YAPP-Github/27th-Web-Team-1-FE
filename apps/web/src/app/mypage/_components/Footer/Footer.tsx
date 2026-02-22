import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <button type="button" className={styles.footerButton}>
        로그아웃
      </button>
      <span className={styles.divider} />
      <button type="button" className={styles.footerButton}>
        회원 탈퇴
      </button>
    </footer>
  );
}
