import AlbumDetail from '../albumDetail/AlbumDetail';
import { SHEET_CONTEXT_TYPE, SheetContext } from '../constants';
import AlbumGrid from '../albumGrid/AlbumGrid';
import AlbumRow from '../albumRow/AlbumRow';
import type { Album, AlbumDetailData } from '@/types/album.type';

interface BottomSheetContentProps {
  context: SheetContext;
  albums: Album[];
  albumDetailById: Record<number, AlbumDetailData>;
  onSelectAlbum: (albumId: number) => void;
}

const BottomSheetContent = ({
  context,
  albums,
  albumDetailById,
  onSelectAlbum,
}: BottomSheetContentProps) => {
  switch (context.type) {
    case SHEET_CONTEXT_TYPE.HOME:
      return <AlbumRow albums={albums} onSelectAlbum={onSelectAlbum} />;

    case SHEET_CONTEXT_TYPE.ALBUM_LIST:
      return <AlbumGrid albums={albums} onSelectAlbum={onSelectAlbum} />;

    case SHEET_CONTEXT_TYPE.ALBUM_DETAIL:
      return <AlbumDetail album={albumDetailById[context.albumId]} />;

    default:
      return null;
  }
};

export default BottomSheetContent;
