import { useState, useCallback } from 'react';
import {
  useGetPresignedUrl,
  useUpdateProfileImage,
  getGetMyPageQueryKey,
  type MyPageResponse,
} from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';
import { compressImage } from '@/app/photo/add/_utils/compressImage';
import { dataUrlToBlob } from '@/utils/dataUrlToBlob';

const PROFILE_MAX_DIMENSION = 512;
const TARGET_IMAGE_CONTENT_TYPE = 'image/jpeg';

export default function useProfileImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
  const { mutateAsync: updateProfileImage } = useUpdateProfileImage();

  const upload = useCallback(
    async (file: File) => {
      const queryKey = getGetMyPageQueryKey();

      // 1. 낙관적 업데이트: 진행 중인 재요청 취소 후 로컬 프리뷰 즉시 표시
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<MyPageResponse>(queryKey);
      const localPreviewUrl = URL.createObjectURL(file);
      queryClient.setQueryData<MyPageResponse>(queryKey, (old) =>
        old ? { ...old, myProfileImageUrl: localPreviewUrl } : old,
      );

      setIsUploading(true);
      try {
        // 2. 이미지 압축
        const compressed = await compressImage(file, {
          maxDimension: PROFILE_MAX_DIMENSION,
        });
        const compressedBlob = dataUrlToBlob(compressed.dataUrl);

        // 3. Presigned URL 발급
        const response = await getPresignedUrl({
          data: { contentType: TARGET_IMAGE_CONTENT_TYPE },
        });

        const presignedUrl = response?.presignedUrl;
        const objectUrl = response?.objectUrl;

        if (!presignedUrl || !objectUrl) {
          queryClient.setQueryData(queryKey, previousData);
          showToast('이미지 업로드에 실패했어요');
          return;
        }

        // 4. S3 업로드 (압축된 이미지)
        const uploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          body: compressedBlob,
          headers: { 'Content-Type': TARGET_IMAGE_CONTENT_TYPE },
        });

        if (!uploadResponse.ok) {
          queryClient.setQueryData(queryKey, previousData);
          showToast('이미지 업로드에 실패했어요');
          return;
        }

        // 5. 캐시를 S3 URL로 교체
        queryClient.setQueryData<MyPageResponse>(queryKey, (old) =>
          old ? { ...old, myProfileImageUrl: objectUrl } : old,
        );

        // 6. 서버에 프로필 이미지 URL 저장
        await updateProfileImage({ data: { profileImageUrl: objectUrl } });
        await queryClient.invalidateQueries({ queryKey });
      } catch {
        queryClient.setQueryData(queryKey, previousData);
        showToast('프로필 사진 변경에 실패했어요');
      } finally {
        URL.revokeObjectURL(localPreviewUrl);
        setIsUploading(false);
      }
    },
    [getPresignedUrl, updateProfileImage, queryClient, showToast],
  );

  return { upload, isUploading };
}
