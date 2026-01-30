import type { SelectableAlbum } from '@repo/api-client';
import * as S from './AlbumRow.styles';
import AlbumContainer from '@/components/album-container/AlbumContainer';
import { useRef } from 'react';

interface AlbumRowProps {
  albums: SelectableAlbum[];
  onSelectAlbum: (albumId: number) => void;
}

const AlbumRow = ({ albums, onSelectAlbum }: AlbumRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <S.Wrapper
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {albums.map((album) => (
        <AlbumContainer
          key={album.id}
          title={album.title ?? ''}
          type="small"
          thumbnailUrl={album.thumbnailUrl}
          photoCount={album.photoCount ?? 0}
          onClick={() => onSelectAlbum(album.id ?? 0)}
        />
      ))}
    </S.Wrapper>
  );
};

export default AlbumRow;
