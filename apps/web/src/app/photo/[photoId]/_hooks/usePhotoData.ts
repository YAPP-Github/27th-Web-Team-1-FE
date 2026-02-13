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
import { getClusterFromSession } from '@/utils/sessionStorage';

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
  // 클라이언트 클러스터 여부 판별
  const isClientCluster = clusterIdFromQuery?.startsWith('client_');

  // 클라이언트 클러스터인 경우 sessionStorage에서 데이터 가져오기
  // 아니면 서버 API 호출
  const clientClusterPhotosData = useMemo(() => {
    if (isClientCluster && clusterIdFromQuery) {
      return getClusterFromSession<ClusterPhotoResponse[]>(clusterIdFromQuery);
    }
    return null;
  }, [isClientCluster, clusterIdFromQuery]);

  // 클라이언트 클러스터인 경우 sessionStorage에서 photoDetail 생성
  const clientClusterPhotoDetail = useMemo(() => {
    if (!isClientCluster || !clientClusterPhotosData) return undefined;

    const photo = clientClusterPhotosData.find((p) => p.id === photoId);
    if (!photo) return undefined;

    return convertClusterPhotoToPhotoResponse(photo);
  }, [isClientCluster, clientClusterPhotosData, photoId]);

  // 클라이언트 클러스터가 아닌 경우에만 API 호출
  // 또는 클라이언트 클러스터이지만 sessionStorage에 데이터가 없으면 API 호출 (fallback)
  const shouldFetchPhotoDetail = !isClientCluster || (!clientClusterPhotoDetail && isClientCluster);

  const { data: apiPhotoDetail, isLoading: isApiLoading } = useGetPhotoDetail(
    shouldFetchPhotoDetail ? photoId : 0,
  );

  const photoDetail = clientClusterPhotoDetail || apiPhotoDetail;
  const isPhotoLoading = shouldFetchPhotoDetail ? isApiLoading : false;

  const { data: serverClusterPhotosData } = useGetClusterPhotos(
    isClientCluster || !clusterIdFromQuery ? '' : clusterIdFromQuery
  );

  const clusterPhotosData = isClientCluster ? clientClusterPhotosData : serverClusterPhotosData;

  // 앨범 목록 조회 (albumId가 없을 때 albumName으로 찾기 위함)
  // 클라이언트 클러스터인 경우는 필요 없음 (이미 clusterIdFromQuery가 있음)
  const { data: selectableAlbums } = useGetSelectableAlbums({
    query: {
      queryKey: getGetSelectableAlbumsQueryKey(),
      enabled: !albumIdFromQuery && !clusterIdFromQuery && !isClientCluster && !!photoDetail,
    },
  });

  // albumId 결정: 쿼리 파라미터 우선, 없으면 albumName으로 매칭
  // 클라이언트 클러스터인 경우는 albumId가 필요 없음
  const albumId = useMemo(() => {
    if (albumIdFromQuery) return albumIdFromQuery;

    // 클라이언트 클러스터인 경우 albumId 사용 안 함
    if (isClientCluster) return undefined;

    if (selectableAlbums?.albums && photoDetail) {
      const albumNameFromDetail = (photoDetail as any).albumName;
      if (albumNameFromDetail) {
        const matchedAlbum = selectableAlbums.albums.find(
          (album) => album.title === albumNameFromDetail,
        );
        return matchedAlbum?.id;
      }
    }

    return undefined;
  }, [albumIdFromQuery, selectableAlbums?.albums, photoDetail, isClientCluster]);

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
