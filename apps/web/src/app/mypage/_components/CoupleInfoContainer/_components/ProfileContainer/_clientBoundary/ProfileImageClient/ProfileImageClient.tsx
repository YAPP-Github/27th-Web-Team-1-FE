'use client';

import CameraIcon from '@/assets/images/camera.svg';
import * as S from './ProfileImageClient.styles';

interface ProfileImageClientProps {
  profileUrl?: string;
}

export default function ProfileImageClient({ profileUrl }: ProfileImageClientProps) {
  const handleProfileImageClick = () => {
    // TODO: 프로필 이미지 변경 로직 구현
  };

  return (
    <S.Wrapper
      role="button"
      tabIndex={0}
      onClick={handleProfileImageClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProfileImageClick();
        }
      }}
    >
      {profileUrl ? (
        <S.Image src={profileUrl} alt="내 프로필 이미지" />
      ) : (
        <S.Placeholder />
      )}
      <S.CameraButton type="button">
        <CameraIcon width={14} height={14} />
      </S.CameraButton>
    </S.Wrapper>
  );
}
