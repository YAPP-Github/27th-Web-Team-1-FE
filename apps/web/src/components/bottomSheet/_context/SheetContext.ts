export type SheetContext =
  | { type: 'home' }
  | { type: 'albumList' }
  | { type: 'albumDetail'; albumId: number };
