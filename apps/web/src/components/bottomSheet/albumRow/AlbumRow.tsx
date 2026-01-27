import { Album } from '@/types/album.type';
import * as S from './AlbumRow.styles';
import AlbumContainer from '@/components/album-container/AlbumContainer';
import { useRef } from 'react';

interface AlbumRowProps {
  albums: Album[];
}

const AlbumRow = ({ albums }: AlbumRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current!.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = x - startX.current;
    containerRef.current!.scrollLeft = scrollLeft.current - walk;
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
      {albums.map((album, index) => (
        <AlbumContainer
          key={index}
          title={album.title}
          type="small"
          photoList={album.photoList}
          photoCount={album.photoList.length}
        />
      ))}
    </S.Wrapper>
  );
};

export default AlbumRow;
