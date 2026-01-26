import { ReactNode } from 'react';
import * as S from './AlbumGridContainer.styles';

interface AlbumGridContainerProps {
  children: ReactNode;
}

const AlbumGridContainer = ({ children }: AlbumGridContainerProps) => {
  return <S.Container>{children}</S.Container>;
};

export default AlbumGridContainer;
