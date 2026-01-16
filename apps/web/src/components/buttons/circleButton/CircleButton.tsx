import * as S from './CircleButton.styles';

interface CircleButtonProps {
  /** 버튼 아이콘 or 이미지 */
  children: React.ReactNode;
  /** 클릭 이벤트 */
  onClick: () => void;
}

const CircleButton = ({ children, onClick }: CircleButtonProps) => {
  return (
    <S.Wrapper type="button" onClick={onClick}>
      {children}
    </S.Wrapper>
  );
};

export default CircleButton;
