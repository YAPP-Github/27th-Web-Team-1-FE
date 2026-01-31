export const ROUTES = {
  HOME: '/',
  ALBUM: {
    DETAIL: (albumId: number) => `/album/${albumId}`,
  },
  PHOTO: {
    ADD: '/photo/add',
    CAPTURE: '/photo/capture',
    NOTE: {
      ADD: '/photo/add/note',
    },
    VIEW: (photoId: number, albumId?: number) =>
      albumId ? `/photo/${photoId}?albumId=${albumId}` : `/photo/${photoId}`,
    PREVIEW: '/photo/preview',
  },
} as const;
