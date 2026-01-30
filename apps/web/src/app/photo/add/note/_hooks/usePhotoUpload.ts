'use client';

import { useMutation } from '@tanstack/react-query';
import { useGetPresignedUrl, useCreate1 } from '@repo/api-client';
import type { SelectedPhoto } from '../../../add/_types/photo';

interface UploadPhotoParams {
  photo: SelectedPhoto;
  description?: string;
  albumId?: number;
  userId: number;
}

const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
  const response = await fetch(dataUrl);
  return response.blob();
};

export const usePhotoUpload = () => {
  const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
  const { mutateAsync: createPhoto } = useCreate1();

  return useMutation({
    mutationFn: async ({ photo, description, albumId, userId }: UploadPhotoParams) => {
      // 1. Data URL을 Blob으로 변환
      const blob = await dataUrlToBlob(photo.uri);
      const contentType = blob.type || 'image/jpeg';

      // 2. Presigned URL 발급
      const presignedUrlResponse = await getPresignedUrl({
        data: {
          fileName: photo.filename,
          contentType,
        },
      });

      if (!presignedUrlResponse.presignedUrl || !presignedUrlResponse.objectUrl) {
        throw new Error('Failed to get presigned URL');
      }

      // 3. S3에 이미지 업로드
      const uploadResponse = await fetch(presignedUrlResponse.presignedUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': contentType,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image to S3');
      }

      // 4. POST /photos로 메타데이터 저장
      const createResponse = await createPhoto({
        data: {
          url: presignedUrlResponse.objectUrl,
          albumId,
          longitude: photo.location?.longitude,
          latitude: photo.location?.latitude,
          description,
        },
        params: { userId },
      });

      return createResponse;
    },
  });
};
