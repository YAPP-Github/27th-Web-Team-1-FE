import CheckSmallIcon from '@/assets/images/checkSmall.svg';
import styles from './InfoBanner.module.css';

const INFO_ITEMS = [
  '커플 연결이 해제돼요',
  '연결 해제일로부터 31일이 지나면 이전 데이터는 복구할 수 없어요',
] as const;

export default function InfoBanner() {
  return (
    <div className={styles.wrapper}>
      {INFO_ITEMS.map((text) => (
        <div key={text} className={styles.item}>
          <div className={styles.checkCircle}>
            <CheckSmallIcon width={12} height={12} />
          </div>
          <span className={styles.text}>{text}</span>
        </div>
      ))}
    </div>
  );
}
