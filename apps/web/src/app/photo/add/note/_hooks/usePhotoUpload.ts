'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useGetPresignedUrl,
  useCreate,
  getGetPhotosQueryKey,
  type AlbumThumbnails,
  type PhotoListResponse,
} from '@repo/api-client';
import { getMapMeAlbumsQueryKey } from '@/hooks/queries/useMapMeAlbums';
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
  const queryClient = useQueryClient();
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
          albumId,
          longitude: finalLocation.longitude,
          latitude: finalLocation.latitude,
          takenAt: photo.createdAt,
          description,
        },
      });

      return createResponse;
    },
    onMutate: ({ photo, albumId, description, location }) => {
      // cancelQueries는 fire-and-forget으로 처리 (await하면 setQueryData가 비동기로 밀림)
      queryClient.cancelQueries({ queryKey: getMapMeAlbumsQueryKey() });
      if (albumId) {
        queryClient.cancelQueries({ queryKey: getGetPhotosQueryKey(albumId) });
      }

      const previousAlbums = queryClient.getQueryData<AlbumThumbnails[]>(
        getMapMeAlbumsQueryKey(),
      );
      const previousPhotos = albumId
        ? queryClient.getQueryData<PhotoListResponse>(getGetPhotosQueryKey(albumId))
        : undefined;

      const finalLocation = location ?? photo.location;

      // 앨범 사진 목록 낙관적 업데이트
      if (albumId) {
        queryClient.setQueryData<PhotoListResponse>(
          getGetPhotosQueryKey(albumId),
          (old) => {
            if (!old?.albums?.length) return old;
            return {
              ...old,
              albums: old.albums.map((album) =>
                album.id === albumId
                  ? {
                      ...album,
                      photoCount: (album.photoCount ?? 0) + 1,
                      photos: [
                        {
                          id: -Date.now(),
                          url: photo.uri,
                          location: finalLocation
                            ? {
                                latitude: finalLocation.latitude,
                                longitude: finalLocation.longitude,
                              }
                            : undefined,
                          description,
                          takenAt: photo.createdAt,
                        },
                        ...(album.photos ?? []),
                      ],
                    }
                  : album,
              ),
            };
          },
        );
      }

      // 앨범 썸네일 목록 낙관적 업데이트
      if (albumId) {
        queryClient.setQueryData<AlbumThumbnails[]>(getMapMeAlbumsQueryKey(), (old) => {
          if (!old) return old;
          return old.map((album) =>
            album.id === albumId
              ? {
                  ...album,
                  photoCount: (album.photoCount ?? 0) + 1,
                  thumbnailUrls: [photo.uri, ...(album.thumbnailUrls ?? [])].slice(0, 4),
                }
              : album,
          );
        });
      }

      return { previousAlbums, previousPhotos, albumId };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousAlbums !== undefined) {
        queryClient.setQueryData(getMapMeAlbumsQueryKey(), context.previousAlbums);
      }
      if (context?.albumId && context?.previousPhotos !== undefined) {
        queryClient.setQueryData(
          getGetPhotosQueryKey(context.albumId),
          context.previousPhotos,
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: getMapMeAlbumsQueryKey() });
      if (variables?.albumId) {
        queryClient.invalidateQueries({
          queryKey: getGetPhotosQueryKey(variables.albumId),
        });
      }
    },
  });
};
