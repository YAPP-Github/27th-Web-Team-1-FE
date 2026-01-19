import { ReactNode } from 'react';
import * as S from './Popup.styles';

interface PopupLayerProps {
  children: ReactNode;
}

const PopupLayer = ({ children }: PopupLayerProps) => {
  return <S.Layer>{children}</S.Layer>;
};

export default PopupLayer;
