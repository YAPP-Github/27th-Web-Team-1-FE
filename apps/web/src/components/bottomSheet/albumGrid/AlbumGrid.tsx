import Input from '@/components/input/Input';
import * as S from './AlbumGrid.styles';
import { useMemo, useState } from 'react';
import AlbumContainer from '@/components/album-container/AlbumContainer';
import AlbumGridContainer from '@/components/album-grid-container/AlbumGridContainer';
import type { Album } from '@/types/album.type';

interface AlbumGridProps {
  albums: Album[];
  onSelectAlbum: (albumId: number) => void;
}

const AlbumGrid = ({ albums, onSelectAlbum }: AlbumGridProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filteredAlbums = useMemo(() => {
    const keyword = searchValue.trim();
    if (!keyword) return albums;
    return albums.filter((album) => album.title.includes(keyword));
  }, [albums, searchValue]);

  return (
    <S.Wrapper>
      <S.InputSection>
        <Input
          type="search"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="앨범을 검색해보세요..."
          showCharCount={false}
        />
      </S.InputSection>
      <S.GridSection>
        <AlbumGridContainer>
          {filteredAlbums.map((album) => (
            <AlbumContainer
              key={album.id}
              title={album.title}
              type="medium"
              photoList={album.photoList}
              photoCount={album.photoCount}
              onClick={() => onSelectAlbum(album.id)}
            />
          ))}
        </AlbumGridContainer>
      </S.GridSection>
    </S.Wrapper>
  );
};

export default AlbumGrid;
