import styles from './Nickname.module.css';

interface NicknameProps {
  username?: string;
}

export default function Nickname({ username }: NicknameProps) {
  return <span className={styles.text}>{username ?? ''}</span>;
}
