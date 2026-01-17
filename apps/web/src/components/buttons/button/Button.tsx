'use client';

import { ButtonSize, ButtonVariant } from '@/types/button.type';
import * as S from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 텍스트 */
  text: string;
  /** 버튼 onClick */
  onClick: () => void;
  /** 버튼 사이즈 */
  size?: ButtonSize;
  /** disabled */
  disabled?: boolean;
  /** 버튼 variant */
  variant?: ButtonVariant;
}

const Button = ({
  text,
  onClick,
  size = 'medium',
  disabled = false,
  variant = 'primary',
}: ButtonProps) => {
  return (
    <S.Button size={size} variant={variant} onClick={onClick} disabled={disabled}>
      {text}
    </S.Button>
  );
};

export default Button;
