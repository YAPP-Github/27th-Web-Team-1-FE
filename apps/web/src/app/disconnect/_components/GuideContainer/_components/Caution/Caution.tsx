import { RECONNECTION_DAYS } from '@/app/disconnect/constants';
import styles from './Caution.module.css';

const CAUTION_ITEMS = [
  '나와 상대방의 연결이 끊어지면 열람이 차단되며, 기간 내 재연결 시 기존 데이터를 다시 확인할 수 있습니다.',
  `데이터를 복구할 수 있는 기간은 연결을 끊은 시점으로부터 ${RECONNECTION_DAYS}일 이전까지입니다.`,
  '재연결 시, 연결을 끊었던 계정으로 로그인 및 재연결을 해야만 합니다.',
  '같은 계정으로 새로운 연결을 맺거나 계정을 삭제한 경우, 이전의 데이터는 복구 및 백업할 수 없습니다. (단, 복구기간 내 이전 계정과의 데이터 복구는 가능합니다.)',
] as const;

export default function Caution() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>주의 사항</h2>
      <ul className={styles.list}>
        {CAUTION_ITEMS.map((text) => (
          <li key={text} className={styles.item}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
