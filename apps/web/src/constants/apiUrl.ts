export const API_URL = {
  ALBUMS: {
    SELECTABLE: '/albums/selectable',
  },
  LOCATION: {
    ADDRESS: '/location/address',
  },
  MAP: {
    PLACES_SEARCH: '/map/places/search',
  },
  PHOTOS: {
    BASE: '/photos',
    DETAIL: (photoId: number | string) => `/photos/${photoId}`,
    PRESIGNED_URL: '/photos/presigned-url',
  },
} as const;
