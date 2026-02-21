'use client';

import { useState, useCallback } from 'react';
import {
  useGetPresignedUrl,
  useUpdateNickname,
  useUpdateProfileImage,
} from '@repo/api-client';
import { useToast } from '@/components/toast';

export function useProfileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();
  const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
  const { mutateAsync: updateNickname } = useUpdateNickname();
  const { mutateAsync: updateProfileImage } = useUpdateProfileImage();

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      setIsUploading(true);
      try {
        // 1. Presigned URL 받기
        const response = await getPresignedUrl({
          data: {
            contentType: file.type,
          },
        });

        const presignedUrl = response?.presignedUrl;
        const objectUrl = response?.objectUrl;

        if (!presignedUrl || !objectUrl) {
          showToast('이미지 업로드에 실패했어요');
          return null;
        }

        // 2. S3에 업로드
        const uploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (!uploadResponse.ok) {
          showToast('이미지 업로드에 실패했어요');
          return null;
        }

        return objectUrl;
      } catch (error) {
        showToast('이미지 업로드에 실패했어요');
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [getPresignedUrl, showToast],
  );

  const saveProfile = useCallback(
    async (nickname: string, profileImageUrl: string | null) => {
      try {
        await updateNickname({ data: { nickname } });

        if (profileImageUrl) {
          await updateProfileImage({ data: { profileImageUrl } });
        }

        return true;
      } catch (error) {
        showToast('프로필 저장에 실패했어요');
        return false;
      }
    },
    [updateNickname, updateProfileImage, showToast],
  );

  return {
    uploadImage,
    saveProfile,
    isUploading,
  };
}
