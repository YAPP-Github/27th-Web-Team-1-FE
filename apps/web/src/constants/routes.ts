export const ROUTES = {
  HOME: '/',
  PHOTO: {
    ADD: '/photo/add',
    NOTE: {
      ADD: '/photo/add/note',
    },
    VIEW: (photoId: number, albumId?: number) =>
      albumId ? `/photo/${photoId}?albumId=${albumId}` : `/photo/${photoId}`,
  },
} as const;
