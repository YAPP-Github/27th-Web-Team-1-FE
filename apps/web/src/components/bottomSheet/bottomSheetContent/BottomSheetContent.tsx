import AlbumDetail from '../\balbumDetail/AlbumDetail';
import { SheetContext } from '../_context/SheetContext';
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
    case 'home':
      return <AlbumRow albums={albums} onSelectAlbum={onSelectAlbum} />;

    case 'albumList':
      return <AlbumGrid albums={albums} onSelectAlbum={onSelectAlbum} />;

    case 'albumDetail':
      return (
        <AlbumDetail album={albumDetailById[context.albumId]} />
      );

    default:
      return null;
  }
};

export default BottomSheetContent;
