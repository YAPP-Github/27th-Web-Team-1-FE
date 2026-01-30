import type { SelectableAlbum } from '@repo/api-client';
import AlbumRow from '../album-row/AlbumRow';
import * as S from './AlbumListContainer.styles';

interface AlbumListContainerProps {
  /** 앨범 목록 */
  albums: SelectableAlbum[];
  /** 선택된 앨범 ID */
  selectedAlbumId: number | null;
  /** 앨범 선택 핸들러 */
  onSelectAlbum: (albumId: number) => void;
}

const AlbumListContainer = ({
  albums,
  selectedAlbumId,
  onSelectAlbum,
}: AlbumListContainerProps) => {
  return (
    <S.Container>
      {albums.map((album) => (
        <AlbumRow
          key={album.id}
          title={album.title ?? ''}
          thumbnail={album.thumbnailUrl}
          photoCount={album.photoCount ?? 0}
          onClick={() => onSelectAlbum(album.id ?? 0)}
          isSelected={selectedAlbumId === album.id}
        />
      ))}
    </S.Container>
  );
};

export default AlbumListContainer;
