export const SHEET_CONTEXT_TYPE = {
  HOME: 'home',
  ALBUM_LIST: 'albumList',
  ALBUM_DETAIL: 'albumDetail',
  CLUSTER_DETAIL: 'clusterDetail',
} as const;

export type SheetContext =
  | { type: typeof SHEET_CONTEXT_TYPE.HOME }
  | { type: typeof SHEET_CONTEXT_TYPE.ALBUM_LIST }
  | { type: typeof SHEET_CONTEXT_TYPE.ALBUM_DETAIL; albumId: number }
  | {
      type: typeof SHEET_CONTEXT_TYPE.CLUSTER_DETAIL;
      clusterId: string;
      latitude: number;
      longitude: number;
    };

export const LOW_HEIGHT = 64;
export const MIN_HEIGHT = 160;
export const MID_HEIGHT = 394;
