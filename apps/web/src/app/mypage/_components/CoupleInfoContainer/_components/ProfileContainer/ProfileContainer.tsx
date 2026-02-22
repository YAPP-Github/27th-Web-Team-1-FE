import ProfileImage from './_components/ProfileImage/ProfileImage';
import Nickname from './_components/Nickname/Nickname';
import ProfileImageClient from './_clientBoundary/ProfileImageClient/ProfileImageClient';
import NicknameClient from './_clientBoundary/NicknameClient/NicknameClient';
import styles from './ProfileContainer.module.css';

interface ProfileContainerProps {
  isMe?: boolean;
  profileUrl?: string;
  username?: string;
}

export default function ProfileContainer({
  isMe = false,
  profileUrl,
  username,
}: ProfileContainerProps) {
  return (
    <div className={styles.wrapper}>
      {isMe ? (
        <>
          <ProfileImageClient profileUrl={profileUrl} />
          <NicknameClient username={username} />
        </>
      ) : (
        <>
          <ProfileImage profileUrl={profileUrl} />
          <Nickname username={username} />
        </>
      )}
    </div>
  );
}
