import * as S from './FloatingButton.styles';

interface FloatingButtonProps {
  /** 버튼 텍스트 */
  text: string;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 버튼 아이콘 */
  icon?: React.ReactNode;
}

const FloatingButton = ({ text, icon, onClick }: FloatingButtonProps) => {
  return (
    <S.Wrapper onClick={onClick}>
      {icon}
      <S.TextContainer>{text}</S.TextContainer>
    </S.Wrapper>
  );
};

export default FloatingButton;
