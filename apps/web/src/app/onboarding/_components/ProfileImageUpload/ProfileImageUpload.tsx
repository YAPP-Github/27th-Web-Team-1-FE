'use client';

import { useRef, ChangeEvent } from 'react';
import ProfileIcon from '@/assets/images/defaultProfile.svg';
import CameraIcon from '@/assets/images/camera.svg';
import { isAllowedImageType } from '@/constants/image';
import * as S from './ProfileImageUpload.styles';

interface ProfileImageUploadProps {
  imageUrl: string | null;
  onImageSelect: (file: File) => void;
  isUploading?: boolean;
}

export default function ProfileImageUpload({
  imageUrl,
  onImageSelect,
  isUploading = false,
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isAllowedImageType(file)) {
      onImageSelect(file);
      e.target.value = '';
    }
  };

  return (
    <S.Container>
      <S.ImagePreview onClick={handleClick} data-disabled={isUploading}>
        {imageUrl ? (
          <S.Image src={imageUrl} alt="프로필 이미지" />
        ) : (
          <S.Placeholder>
            <ProfileIcon />
          </S.Placeholder>
        )}
        <S.CameraButton
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          disabled={isUploading}
        >
          <S.CameraIcon>
            <CameraIcon width={14} height={14} />
          </S.CameraIcon>
        </S.CameraButton>
        {isUploading && <S.LoadingOverlay />}
      </S.ImagePreview>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </S.Container>
  );
}
