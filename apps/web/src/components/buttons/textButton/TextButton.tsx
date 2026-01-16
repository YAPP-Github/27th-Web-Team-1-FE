import { TextButtonVariant } from '@/types/button.type';
import * as S from './TextButton.styles';

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 텍스트 */
  text: string;
  /** 클릭 이벤트 */
  onClick: () => void;
  /** 버튼 variant */
  variant?: TextButtonVariant;
  /** 버튼 활성화 여부 */
  disabled?: boolean;
}

const TextButton = ({
  text,
  onClick,
  variant = 'default',
  disabled = false,
}: TextButtonProps) => {
  return (
    <S.Wrapper type="button" onClick={onClick} variant={variant} disabled={disabled}>
      {text}
    </S.Wrapper>
  );
};

export default TextButton;
