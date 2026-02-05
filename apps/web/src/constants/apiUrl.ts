export const API_URL = {
  AUTH: {
    LOGIN: '/auth/login',
    KAKAO: '/auth/kakao',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  ALBUMS: {
    SELECTABLE: '/albums/selectable',
    DETAIL: (albumId: number | string) => `/albums/${albumId}`,
  },
  LOCATION: {
    ADDRESS: '/location/address',
  },
  MAP: {
    HOME: '/map/home',
    PLACES_SEARCH: '/map/places/search',
    LOCATION: '/map/location',
  },
  PHOTOS: {
    BASE: '/photos',
    BY_ALBUM: (albumId: number | string) => `/photos/album/${albumId}`,
    DETAIL: (photoId: number | string) => `/photos/${photoId}`,
    PRESIGNED_URL: '/photos/presigned-url',
  },
} as const;
