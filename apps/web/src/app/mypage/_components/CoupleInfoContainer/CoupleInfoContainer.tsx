import ProfileContainer from './_components/ProfileContainer/ProfileContainer';
import LoveIcon from './_components/LoveIcon/LoveIcon';
import styles from './CoupleInfoContainer.module.css';

export default function CoupleInfoContainer() {
  return (
    <section className={styles.wrapper}>
      <ProfileContainer isMe />
      <LoveIcon />
      <ProfileContainer />
    </section>
  );
}
