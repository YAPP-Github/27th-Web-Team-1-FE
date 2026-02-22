import ProfileContainer from './_components/ProfileContainer/ProfileContainer';
import LoveIcon from './_components/LoveIcon/LoveIcon';
import styles from './CoupleInfoContainer.module.css';

export default function CoupleInfoContainer() {
  return (
    <section className={styles.wrapper}>
      {/* TODO: API 연동 후 실제 유저 데이터로 교체 */}
      <ProfileContainer isMe username="지수" />
      <LoveIcon />
      <ProfileContainer username="연인" />
    </section>
  );
}
