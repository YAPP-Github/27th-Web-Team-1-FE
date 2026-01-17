import { ChipSize, ChipVariant } from '@/types/button.type';
import * as S from './Chip.styles';

interface ChipProps {
  /** Chip 텍스트 */
  text: string;
  /** Chip variant */
  variant?: ChipVariant;
  /** Chip 사이즈 */
  size: ChipSize;
  /** 좌측 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 제거 버튼 표시 여부 */
  onCancel?: () => void;
}

const Chip = ({
  text,
  variant = 'black',
  size,
  showIcon = false,
  onCancel,
}: ChipProps) => {
  return (
    <S.Wrapper size={size} variant={variant}>
      {showIcon && <S.LocationIcon />}
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
