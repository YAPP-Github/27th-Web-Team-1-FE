import { useMemo } from 'react';
import {
  useGetPhotoDetail,
  useGetPhotos,
  useGetSelectableAlbums,
  useGetClusterPhotos,
  getGetSelectableAlbumsQueryKey,
  getGetPhotosQueryKey,
  type PhotoResponse,
  type ClusterPhotoResponse,
} from '@repo/api-client';

interface UsePhotoDataProps {
  photoId: number;
  albumIdFromQuery?: number;
  clusterIdFromQuery?: string;
}

const convertClusterPhotoToPhotoResponse = (
  photo: ClusterPhotoResponse,
): PhotoResponse => ({
  id: photo.id,
  url: photo.url,
  takenAt: photo.takenAt,
  location: {
    longitude: photo.longitude,
    latitude: photo.latitude,
  },
  description: undefined,
});

const sortPhotosByDate = (photos: PhotoResponse[]): PhotoResponse[] => {
  return [...photos].sort((a, b) => {
    const dateA = a.takenAt ? new Date(a.takenAt).getTime() : 0;
    const dateB = b.takenAt ? new Date(b.takenAt).getTime() : 0;
    return dateB - dateA;
  });
};

const usePhotoData = ({
  photoId,
  albumIdFromQuery,
  clusterIdFromQuery,
}: UsePhotoDataProps) => {
  const { data: photoDetail, isLoading: isPhotoLoading } = useGetPhotoDetail(photoId);

  // 클러스터 사진 조회
  const { data: clusterPhotosData } = useGetClusterPhotos(clusterIdFromQuery ?? '');

  // 앨범 목록 조회 (albumId가 없을 때 albumName으로 찾기 위함)
  const { data: selectableAlbums } = useGetSelectableAlbums({
    query: {
      queryKey: getGetSelectableAlbumsQueryKey(),
      enabled: !albumIdFromQuery && !clusterIdFromQuery && !!photoDetail?.albumName,
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
      enabled: !!albumId && !clusterIdFromQuery,
    },
  });

  const photos = useMemo(() => {
    let photoList: PhotoResponse[] = [];

    // 클러스터 사진 우선
    if (clusterPhotosData && Array.isArray(clusterPhotosData)) {
      photoList = clusterPhotosData.map(convertClusterPhotoToPhotoResponse);
    } else if (albumPhotos?.albums?.[0]?.photos) {
      photoList = albumPhotos.albums[0].photos;
    }

    // 날짜순 정렬
    return sortPhotosByDate(photoList);
  }, [clusterPhotosData, albumPhotos]);

  return {
    photoDetail,
    photos,
    isPhotoLoading,
  };
};

export default usePhotoData;
