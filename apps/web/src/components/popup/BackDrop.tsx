import { CSSProperties } from 'react';
import * as S from './Popup.styles';

interface BackdropProps {
  onClick?: () => void;
  style?: CSSProperties;
}

const Backdrop = ({ onClick, style }: BackdropProps) => {
  return <S.Backdrop onClick={onClick} style={style} />;
};

export default Backdrop;
