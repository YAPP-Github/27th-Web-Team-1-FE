import Input from '@/components/input/Input';
import * as S from './AlbumGrid.styles';
import { useState } from 'react';
import { mockAlbums } from '../mockAlbums';
import AlbumContainer from '@/components/album-container/AlbumContainer';
import AlbumGridContainer from '@/components/album-grid-container/AlbumGridContainer';

interface AlbumGridProps {}

const AlbumGrid = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <S.Wrapper>
      <S.InputSection>
        <Input
          type="search"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="앨범을 검색해보세요..."
        />
      </S.InputSection>
      <S.GridSection>
        <AlbumGridContainer>
          {mockAlbums.map((album, index) => (
            <AlbumContainer
              key={index}
              title={album.title}
              type="medium"
              photoList={album.photoList}
              photoCount={album.photoList.length}
            />
          ))}
        </AlbumGridContainer>
      </S.GridSection>
    </S.Wrapper>
  );
};

export default AlbumGrid;
