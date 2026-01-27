import { ReactNode } from 'react';
import { ChipSize, ChipVariant } from '@/types/button.type';
import * as S from './Chip.styles';

interface ChipProps {
  /** Chip 텍스트 */
  text: string;
  /** Chip variant */
  variant?: ChipVariant;
  /** Chip 사이즈 */
  size: ChipSize;
  /** 좌측 아이콘 표시 여부 (기본 LocationIcon) */
  showIcon?: boolean;
  /** 커스텀 좌측 아이콘 */
  icon?: ReactNode;
  /** 클릭 이벤트 */
  onClick?: () => void;
  /** 제거 버튼 표시 여부 */
  onCancel?: () => void;
}

const Chip = ({
  text,
  variant = 'black',
  size,
  showIcon = false,
  icon,
  onClick,
  onCancel,
}: ChipProps) => {
  return (
    <S.Wrapper size={size} variant={variant} onClick={onClick} $clickable={!!onClick}>
      {icon ? <S.IconWrapper>{icon}</S.IconWrapper> : showIcon && <S.LocationIcon />}
      {text}
      {onCancel && (
        <S.IconButton onClick={onCancel}>
          <S.CancelIcon />
        </S.IconButton>
      )}
    </S.Wrapper>
  );
};

export default Chip;
