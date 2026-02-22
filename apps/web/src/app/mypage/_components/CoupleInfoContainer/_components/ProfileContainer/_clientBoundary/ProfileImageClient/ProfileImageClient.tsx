'use client';

import DefaultProfileIcon from '@/assets/images/defaultProfile.svg';
import CameraIcon from '@/assets/images/camera.svg';
import * as S from './ProfileImageClient.styles';

interface ProfileImageClientProps {
  profileUrl?: string;
}

export default function ProfileImageClient({
  profileUrl,
}: ProfileImageClientProps) {
  return (
    <S.Wrapper>
      {profileUrl ? (
        <S.Image src={profileUrl} alt="내 프로필 이미지" />
      ) : (
        <DefaultProfileIcon />
      )}
      <S.CameraButton>
        <CameraIcon width={14} height={14} />
      </S.CameraButton>
    </S.Wrapper>
  );
}
