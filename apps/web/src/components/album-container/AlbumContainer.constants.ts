export const ALBUM_CONTAINER_TYPE = {
  SMALL: 'small',
  MEDIUM: 'medium',
} as const;

export type AlbumContainerType =
  (typeof ALBUM_CONTAINER_TYPE)[keyof typeof ALBUM_CONTAINER_TYPE];

export const MAX_GRID_PHOTOS = 4;
