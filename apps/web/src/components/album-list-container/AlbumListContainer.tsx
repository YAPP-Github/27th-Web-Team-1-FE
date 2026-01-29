import { SelectableAlbum } from '@/types/album.type';
import AlbumRow from '../album-row/AlbumRow';
import * as S from './AlbumListContainer.styles';

interface AlbumListContainerProps {
  /** 앨범 목록 */
  albums: SelectableAlbum[];
  /** 선택된 앨범 ID */
  selectedAlbumId: string | null;
  /** 앨범 선택 핸들러 */
  onSelectAlbum: (albumId: string) => void;
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
          title={album.title}
          thumbnail={album.thumbnail}
          photoCount={album.photoCount}
          onClick={() => onSelectAlbum(album.id)}
          isSelected={selectedAlbumId === album.id}
        />
      ))}
    </S.Container>
  );
};

export default AlbumListContainer;
