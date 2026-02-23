import type { DisplayPhoto } from '@/stores/pendingPhotos/types';
import type {
  AlbumThumbnails,
  AlbumWithPhotosResponse,
  ClusterPhotoResponse,
} from '@repo/api-client';
import AlbumDetail from '../albumDetail/AlbumDetail';
import AlbumGrid from '../albumGrid/AlbumGrid';
import AlbumRow from '../albumRow/AlbumRow';
import ClusterDetail from '../clusterDetail/ClusterDetail';
import { SHEET_CONTEXT_TYPE, SheetContext } from '../constants';

interface BottomSheetContentProps {
  context: SheetContext;
  albums: AlbumThumbnails[];
  albumDetailById: Record<number, AlbumWithPhotosResponse>;
  displayPhotos: DisplayPhoto[];
  onSelectAlbum: (albumId: number) => void;
  onRenameAlbum: (albumId: number, albumTitle: string) => void;
  onDeleteAlbum: (albumId: number) => void;
  clusterExpansionData?: Map<string, ClusterPhotoResponse[]>;
}

const BottomSheetContent = ({
  context,
  albums,
  albumDetailById,
  displayPhotos,
  onSelectAlbum,
  onRenameAlbum,
  onDeleteAlbum,
  clusterExpansionData,
}: BottomSheetContentProps) => {
  switch (context.type) {
    case SHEET_CONTEXT_TYPE.HOME:
      return <AlbumRow albums={albums} onSelectAlbum={onSelectAlbum} />;

    case SHEET_CONTEXT_TYPE.ALBUM_LIST:
      return (
        <AlbumGrid
          albums={albums}
          onSelectAlbum={onSelectAlbum}
          onRenameAlbum={onRenameAlbum}
          onDeleteAlbum={onDeleteAlbum}
        />
      );

    case SHEET_CONTEXT_TYPE.ALBUM_DETAIL:
      return (
        <AlbumDetail
          album={albumDetailById[context.albumId]}
          displayPhotos={displayPhotos}
        />
      );

    case SHEET_CONTEXT_TYPE.CLUSTER_DETAIL:
      return (
        <ClusterDetail
          clusterId={context.clusterId}
          clusterExpansionData={clusterExpansionData}
        />
      );

    default:
      return null;
  }
};

export default BottomSheetContent;
