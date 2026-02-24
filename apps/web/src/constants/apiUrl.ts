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
    ME: '/map/me',
    ALBUMS: (albumId: number | string) => `/map/albums/${albumId}`,
    PLACES_SEARCH: '/map/places/search',
    LOCATION: '/map/location',
  },
  COUPLES: {
    BASE: '/couples/me',
    STATUS: '/couples/me/status',
    FIRST_MET_DATE: '/couples/me/first-met-date',
    INVITES: '/couples/invites',
  },
  MY_PAGE: {
    BASE: '/my-page',
    NICKNAME: '/my-page/nickname',
    PROFILE_IMAGE: '/my-page/profile-image',
  },
  USERS: {
    ME: '/users/me',
  },
  PHOTOS: {
    BASE: '/photos',
    BY_ALBUM: (albumId: number | string) => `/photos/album/${albumId}`,
    DETAIL: (photoId: number | string) => `/photos/${photoId}`,
    PRESIGNED_URL: '/photos/presigned-url',
  },
} as const;
