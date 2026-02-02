'use client';

import { useMutation } from '@tanstack/react-query';
import { useGetPresignedUrl, useCreate } from '@repo/api-client';
import type { SelectedPhoto, PhotoLocation } from '../../../add/_types/photo';

interface UploadPhotoParams {
  photo: SelectedPhoto;
  description?: string;
  albumId?: number;
  location?: PhotoLocation;
}

const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
  const response = await fetch(dataUrl);
  return response.blob();
};

export const usePhotoUpload = () => {
  const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
  const { mutateAsync: createPhoto } = useCreate();

  return useMutation({
    mutationFn: async ({ photo, description, albumId, location }: UploadPhotoParams) => {
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
      // location 파라미터가 있으면 우선 사용 (사용자가 수동으로 선택한 위치)
      const finalLocation: PhotoLocation | undefined = location ?? photo.location;

      if (!finalLocation) {
        throw new Error('Location is required');
      }

      const createResponse = await createPhoto({
        data: {
          url: presignedUrlResponse.objectUrl,
          albumId: albumId ?? 0,
          longitude: finalLocation.longitude,
          latitude: finalLocation.latitude,
          takenAt: photo.createdAt,
          description,
        },
      });

      return createResponse;
    },
  });
};
