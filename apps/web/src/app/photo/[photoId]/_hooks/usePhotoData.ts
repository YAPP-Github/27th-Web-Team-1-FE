import { useMemo } from 'react';
import {
  useGetPhotoDetail,
  useGetPhotos,
  useGetSelectableAlbums,
  getGetSelectableAlbumsQueryKey,
  getGetPhotosQueryKey,
} from '@repo/api-client';

interface UsePhotoDataProps {
  photoId: number;
  albumIdFromQuery?: number;
}

const usePhotoData = ({ photoId, albumIdFromQuery }: UsePhotoDataProps) => {
  const { data: photoDetail, isLoading: isPhotoLoading } = useGetPhotoDetail(photoId);

  // 앨범 목록 조회 (albumId가 없을 때 albumName으로 찾기 위함)
  const { data: selectableAlbums } = useGetSelectableAlbums({
    query: {
      queryKey: getGetSelectableAlbumsQueryKey(),
      enabled: !albumIdFromQuery && !!photoDetail?.albumName,
    },
  });

  // albumId 결정: 쿼리 파라미터 우선, 없으면 albumName으로 매칭
  const albumId = useMemo(() => {
    if (albumIdFromQuery) return albumIdFromQuery;

    if (selectableAlbums?.albums && photoDetail?.albumName) {
      const matchedAlbum = selectableAlbums.albums.find(
        (album) => album.title === photoDetail.albumName,
      );
      return matchedAlbum?.id;
    }

    return undefined;
  }, [albumIdFromQuery, selectableAlbums?.albums, photoDetail?.albumName]);

  const { data: albumPhotos } = useGetPhotos(albumId ?? 0, {
    query: {
      queryKey: getGetPhotosQueryKey(albumId),
      enabled: !!albumId,
    },
  });

  const photos = useMemo(() => {
    if (!albumPhotos?.albums?.[0]?.photos) return [];
    return albumPhotos.albums[0].photos;
  }, [albumPhotos]);

  return {
    photoDetail,
    photos,
    isPhotoLoading,
  };
};

export default usePhotoData;
