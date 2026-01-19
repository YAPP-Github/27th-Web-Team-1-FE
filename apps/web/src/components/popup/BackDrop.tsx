import * as S from './Popup.styles';

interface BackdropProps {
  onClick?: () => void;
}

const Backdrop = ({ onClick }: BackdropProps) => {
  return <S.Backdrop onClick={onClick} />;
};

export default Backdrop;
