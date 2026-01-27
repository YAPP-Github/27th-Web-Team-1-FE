import { SheetContext } from '../_context/SheetContext';
import AlbumGrid from '../albumGrid/AlbumGrid';
import AlbumRow from '../albumRow/AlbumRow';
import { mockAlbums } from '../mockAlbums';

interface BottomSheetContentProps {
  context: SheetContext;
}

const BottomSheetContent = ({ context }: BottomSheetContentProps) => {
  switch (context.type) {
    case 'home':
      return <AlbumRow albums={mockAlbums} />;

    case 'albumList':
      return <AlbumGrid />;

    case 'albumDetail':
      return <p>앨범 상세</p>;
  }
};

export default BottomSheetContent;
