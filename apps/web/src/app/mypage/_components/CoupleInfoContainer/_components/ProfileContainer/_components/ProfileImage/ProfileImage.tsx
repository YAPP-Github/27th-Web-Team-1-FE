import styles from './ProfileImage.module.css';

interface ProfileImageProps {
  profileUrl?: string;
}

export default function ProfileImage({ profileUrl }: ProfileImageProps) {
  return (
    <div className={styles.wrapper}>
      {profileUrl ? (
        <img className={styles.image} src={profileUrl} alt="프로필 이미지" />
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  );
}
