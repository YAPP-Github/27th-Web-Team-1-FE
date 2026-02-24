import KakaoIcon from '@/assets/images/kakao.svg';
import styles from './AccountInfo.module.css';

// TODO: 계정 이메일 주소 API 연동
const MOCK_EMAIL = 'supreme1mode@gmail.com';

export default function AccountInfo() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>현재 계정</h2>
      <div className={styles.box}>
        <span className={styles.email}>{MOCK_EMAIL}</span>
        <div className={styles.kakaoCircle}>
          <KakaoIcon width={9} height={9} />
        </div>
      </div>
    </div>
  );
}
