export const SHEET_CONTEXT_TYPE = {
  HOME: 'home',
  ALBUM_LIST: 'albumList',
  ALBUM_DETAIL: 'albumDetail',
} as const;

export type SheetContext =
  | { type: typeof SHEET_CONTEXT_TYPE.HOME }
  | { type: typeof SHEET_CONTEXT_TYPE.ALBUM_LIST }
  | { type: typeof SHEET_CONTEXT_TYPE.ALBUM_DETAIL; albumId: number };

export const MIN_HEIGHT = 160;
export const MID_HEIGHT = 394;
