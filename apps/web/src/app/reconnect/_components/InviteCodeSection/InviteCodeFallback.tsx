import Skeleton from '@/components/common/skeleton/Skeleton';
import KakaoSvg from '@/assets/images/kakao.svg';
import styles from '../../page.module.css';

export default function InviteCodeFallback() {
  return (
    <>
      <section className={styles.codeSection}>
        <h2 className={styles.sectionTitle}>내 초대 코드</h2>
        <div className={styles.codeDisplay}>
          <Skeleton width={60} height={16} borderRadius={4} />
        </div>
      </section>
      <button type="button" className={styles.kakaoShareButton} disabled>
        <span className={styles.kakaoIcon}>
          <KakaoSvg />
        </span>
        카카오톡으로 공유하기
      </button>
    </>
  );
}
