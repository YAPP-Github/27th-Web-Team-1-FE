import type { AlbumThumbnails, AlbumWithPhotosResponse } from '@repo/api-client';
import AlbumDetail from '../albumDetail/AlbumDetail';
import ClusterDetail from '../clusterDetail/ClusterDetail';
import { SHEET_CONTEXT_TYPE, SheetContext } from '../constants';
import AlbumGrid from '../albumGrid/AlbumGrid';
import AlbumRow from '../albumRow/AlbumRow';

interface BottomSheetContentProps {
  context: SheetContext;
  albums: AlbumThumbnails[];
  albumDetailById: Record<number, AlbumWithPhotosResponse>;
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

    case SHEET_CONTEXT_TYPE.CLUSTER_DETAIL:
      return <ClusterDetail clusterId={context.clusterId} />;

    default:
      return null;
  }
};

export default BottomSheetContent;
