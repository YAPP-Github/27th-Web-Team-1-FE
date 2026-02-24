import styles from './Intro.module.css';

export default function Intro() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>로킷을 탈퇴할까요?</h2>
      <p className={styles.description}>
        계정 삭제 시 데이터 복구 및 재연결이 불가하오니, 신중하게 결정해주세요. 동일한
        계정으로 재가입한 경우에도 복구가 불가능합니다.
      </p>
    </div>
  );
}
