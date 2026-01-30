export const API_URL = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  ALBUMS: {
    SELECTABLE: '/albums/selectable',
    DETAIL: (albumId: number | string) => `/albums/${albumId}`,
  },
  LOCATION: {
    ADDRESS: '/location/address',
  },
  MAP: {
    PLACES_SEARCH: '/map/places/search',
  },
  PHOTOS: {
    BASE: '/photos',
    BY_ALBUM: (albumId: number | string) => `/photos/album/${albumId}`,
    DETAIL: (photoId: number | string) => `/photos/${photoId}`,
    PRESIGNED_URL: '/photos/presigned-url',
  },
} as const;
