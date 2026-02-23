import ProfileImage from './_components/ProfileImage/ProfileImage';
import Nickname from './_components/Nickname/Nickname';
import ProfileImageClient from './_clientBoundary/ProfileImageClient/ProfileImageClient';
import NicknameClient from './_clientBoundary/NicknameClient/NicknameClient';
import styles from './ProfileContainer.module.css';

interface ProfileContainerProps {
  isMe?: boolean;
}

export default function ProfileContainer({ isMe = false }: ProfileContainerProps) {
  return (
    <div className={styles.wrapper}>
      {isMe ? (
        <>
          <ProfileImageClient />
          <div className={styles.nicknameArea}>
            <NicknameClient />
          </div>
        </>
      ) : (
        <>
          <ProfileImage />
          <div className={styles.nicknameArea}>
            <Nickname />
          </div>
        </>
      )}
    </div>
  );
}
