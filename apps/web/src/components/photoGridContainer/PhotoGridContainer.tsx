import { PropsWithChildren } from 'react';
import * as S from './PhotoGridContainer.styles';

const PhotoGridContainer = ({ children }: PropsWithChildren) => {
  return <S.Container>{children}</S.Container>;
};

export default PhotoGridContainer;
