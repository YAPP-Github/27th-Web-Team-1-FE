import { useMemo } from 'react';
import {
  getGetPhotosQueryKey,
  getGetSelectableAlbumsQueryKey,
  useGetPhotoDetail,
  useGetPhotos,
  useGetSelectableAlbums,
} from '@repo/api-client';

// TODO: 사용자 컨텍스트에서 가져오도록 수정
const TEMP_USER_ID = 1;

interface UsePhotoDataProps {
  photoId: number;
  albumIdFromQuery?: number;
}

const usePhotoData = ({ photoId, albumIdFromQuery }: UsePhotoDataProps) => {
  const { data: photoDetail, isLoading: isPhotoLoading } = useGetPhotoDetail(photoId);

  // 앨범 목록 조회 (albumId가 없을 때 albumName으로 찾기 위함)
  const selectableAlbumsParams = { userId: TEMP_USER_ID };
  const { data: selectableAlbums } = useGetSelectableAlbums(selectableAlbumsParams, {
    query: {
      queryKey: getGetSelectableAlbumsQueryKey(selectableAlbumsParams),
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

  const albumParams = { albumId: albumId ?? 0 };
  const { data: albumPhotos } = useGetPhotos(albumParams, {
    query: {
      queryKey: getGetPhotosQueryKey(albumParams),
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
