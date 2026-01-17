import * as S from './Check.styles';

interface CheckProps {
  /** 체크 여부 */
  checked: boolean;
  /** 체크박스 상태 변경 핸들러 */
  onChange: (checked: boolean) => void;
}

const Check = ({ checked, onChange }: CheckProps) => {
  return (
    <S.Wrapper checked={checked}>
      <S.InputContainer
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        hidden
      />
      <S.CheckIcon checked={checked} />
    </S.Wrapper>
  );
};

export default Check;
