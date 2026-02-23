'use client';

import { useRef, useCallback, type ChangeEvent } from 'react';
import { useGetMyPageSuspense } from '@repo/api-client';
import { isAllowedImageType, ALLOWED_IMAGE_MIME_TYPES } from '@/constants/image';
import CameraIcon from '@/assets/images/camera.svg';
import useProfileImageUpload from './useProfileImageUpload';
import * as S from './ProfileImageClient.styles';

export default function ProfileImageClient() {
  const { data } = useGetMyPageSuspense();
  const profileUrl = data.myProfileImageUrl;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, isUploading } = useProfileImageUpload();

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && isAllowedImageType(file)) {
        upload(file);
      }
      e.target.value = '';
    },
    [upload],
  );

  const handleProfileImageClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
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
      <S.CameraButton type="button" disabled={isUploading}>
        <CameraIcon width={14} height={14} />
      </S.CameraButton>
      {isUploading && <S.LoadingOverlay />}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_IMAGE_MIME_TYPES.join(',')}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </S.Wrapper>
  );
}
