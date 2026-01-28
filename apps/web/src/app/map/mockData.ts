import type { AlbumWithPhotosResponse, PhotoListResponse } from '@repo/api-client';
import type { Album, AlbumDetailData } from '@/types/album.type';
import type { MapPin } from '@/types/map.type';

const center = { latitude: 37.5665, longitude: 126.978 };

const photoListResponseMock: PhotoListResponse = {
  albums: [
    {
      id: 1,
      title: '한강 라이딩',
      photoCount: 5,
      thumbnailUrl: 'https://picsum.photos/id/1018/300/300',
      photos: [
        {
          id: 101,
          url: 'https://picsum.photos/id/1018/300/300',
          location: {
            latitude: center.latitude + 0.003,
            longitude: center.longitude + 0.008,
          },
        },
        {
          id: 102,
          url: 'https://picsum.photos/id/1020/300/300',
          location: {
            latitude: center.latitude + 0.006,
            longitude: center.longitude + 0.004,
          },
        },
        {
          id: 103,
          url: 'https://picsum.photos/id/1024/300/300',
          location: {
            latitude: center.latitude - 0.004,
            longitude: center.longitude + 0.002,
          },
        },
        {
          id: 104,
          url: 'https://picsum.photos/id/1027/300/300',
          location: {
            latitude: center.latitude - 0.002,
            longitude: center.longitude - 0.006,
          },
        },
        {
          id: 105,
          url: 'https://picsum.photos/id/1035/300/300',
          location: {
            latitude: center.latitude + 0.004,
            longitude: center.longitude - 0.004,
          },
        },
      ],
    },
    {
      id: 2,
      title: '카페 투어',
      photoCount: 4,
      thumbnailUrl: 'https://picsum.photos/id/1043/300/300',
      photos: [
        {
          id: 201,
          url: 'https://picsum.photos/id/1043/300/300',
          location: {
            latitude: center.latitude + 0.012,
            longitude: center.longitude - 0.002,
          },
        },
        {
          id: 202,
          url: 'https://picsum.photos/id/1050/300/300',
          location: {
            latitude: center.latitude + 0.009,
            longitude: center.longitude - 0.007,
          },
        },
        {
          id: 203,
          url: 'https://picsum.photos/id/1052/300/300',
          location: {
            latitude: center.latitude + 0.007,
            longitude: center.longitude - 0.011,
          },
        },
        {
          id: 204,
          url: 'https://picsum.photos/id/1060/300/300',
          location: {
            latitude: center.latitude + 0.011,
            longitude: center.longitude - 0.009,
          },
        },
      ],
    },
    {
      id: 3,
      title: '야경 산책',
      photoCount: 6,
      thumbnailUrl: 'https://picsum.photos/id/1063/300/300',
      photos: [
        {
          id: 301,
          url: 'https://picsum.photos/id/1063/300/300',
          location: {
            latitude: center.latitude - 0.008,
            longitude: center.longitude + 0.01,
          },
        },
        {
          id: 302,
          url: 'https://picsum.photos/id/1067/300/300',
          location: {
            latitude: center.latitude - 0.01,
            longitude: center.longitude + 0.014,
          },
        },
        {
          id: 303,
          url: 'https://picsum.photos/id/1070/300/300',
          location: {
            latitude: center.latitude - 0.012,
            longitude: center.longitude + 0.008,
          },
        },
        {
          id: 304,
          url: 'https://picsum.photos/id/1074/300/300',
          location: {
            latitude: center.latitude - 0.006,
            longitude: center.longitude + 0.004,
          },
        },
        {
          id: 305,
          url: 'https://picsum.photos/id/1080/300/300',
          location: {
            latitude: center.latitude - 0.009,
            longitude: center.longitude + 0.001,
          },
        },
        {
          id: 306,
          url: 'https://picsum.photos/id/1084/300/300',
          location: {
            latitude: center.latitude - 0.004,
            longitude: center.longitude + 0.013,
          },
        },
      ],
    },
  ],
};

const safeAlbums: AlbumWithPhotosResponse[] = photoListResponseMock.albums ?? [];

export const albumList: Album[] = safeAlbums.map((album) => {
  const photoList = (album.photos ?? [])
    .filter((photo) => Boolean(photo?.url))
    .map((photo) => ({
      photoId: String(photo.id ?? ''),
      src: photo.url ?? '',
    }));

  return {
    id: album.id ?? 0,
    title: album.title ?? '알 수 없는 앨범',
    photoList,
    photoCount: album.photoCount ?? photoList.length,
  };
});

export const albumDetailById = safeAlbums.reduce<Record<number, AlbumDetailData>>(
  (acc, album) => {
    const albumId = album.id ?? 0;
    acc[albumId] = {
      id: albumId,
      title: album.title ?? '알 수 없는 앨범',
      photos: (album.photos ?? []).map((photo) => ({
        id: photo.id ?? 0,
        url: photo.url ?? '',
      })),
    };
    return acc;
  },
  {},
);

export const mapPins: MapPin[] = safeAlbums.flatMap((album) => {
  const albumId = album.id ?? 0;
  return (album.photos ?? [])
    .filter((photo) => {
      const latitude = photo?.location?.latitude;
      const longitude = photo?.location?.longitude;
      return typeof latitude === 'number' && typeof longitude === 'number';
    })
    .map((photo) => ({
      id: photo.id ?? 0,
      albumId,
      latitude: photo.location?.latitude ?? center.latitude,
      longitude: photo.location?.longitude ?? center.longitude,
      imageUrl: photo.url ?? album.thumbnailUrl ?? 'https://picsum.photos/200/200',
      imageCount: 1,
    }));
});
