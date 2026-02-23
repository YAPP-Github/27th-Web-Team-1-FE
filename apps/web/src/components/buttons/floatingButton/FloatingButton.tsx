import * as S from './FloatingButton.styles';

interface FloatingButtonProps {
  /** 버튼 텍스트 */
  text: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 버튼 아이콘 */
  icon?: React.ReactNode;
}

const FloatingButton = ({ text, icon, onClick, ...rest }: FloatingButtonProps) => {
  return (
    <S.Wrapper onClick={onClick} disabled={!onClick} {...rest}>
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <S.TextContainer>{text}</S.TextContainer>
    </S.Wrapper>
  );
};

export default FloatingButton;
