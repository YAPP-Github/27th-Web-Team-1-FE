import WarningIcon from '@/assets/images/warning.svg';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <div className={styles.wrapper}>
      <WarningIcon width={60} height={60} />
      <h2 className={styles.title}>
        상대방과 연결을 끊기 전에
        <br />꼭 주의 사항을 확인해주세요
      </h2>
    </div>
  );
}
