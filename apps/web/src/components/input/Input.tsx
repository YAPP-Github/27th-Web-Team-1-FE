'use client';

import { ChangeEvent } from 'react';
import * as S from './Input.styles';
import { DEFAULT_MAX_LENGTH, INPUT_TYPE, InputType } from './Input.constants';

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type'
> {
  /** 인풋 타입 */
  type?: InputType;
  /** 인풋 값 */
  value: string;
  /** onChange 핸들러 */
  onChange: (value: string) => void;
  /** 최대 글자 수 */
  max?: number;
  /** 에러 메시지 (값이 있으면 에러 상태로 표시) */
  errorMessage?: string;
  /** 글자 수 표시 여부 */
  showCharCount?: boolean;
}

const Input = ({
  type = INPUT_TYPE.INPUT,
  value,
  onChange,
  max = DEFAULT_MAX_LENGTH,
  errorMessage,
  showCharCount = true,
  ...rest
}: InputProps) => {
  const isError = !!errorMessage;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= max) {
      onChange(newValue);
    }
  };

  const handleReset = () => {
    onChange('');
  };

  return (
    <S.Container>
      <S.InputWrapper isError={isError}>
        {type === INPUT_TYPE.SEARCH && <S.SearchIcon />}
        <S.StyledInput {...rest} type="text" value={value} onChange={handleChange} />
        {showCharCount && (
          <S.CharCount>
            {value.length}/{max}
          </S.CharCount>
        )}
        {value.length > 0 && (
          <S.ResetButton onClick={handleReset} type="button">
            <S.ResetIcon />
          </S.ResetButton>
        )}
      </S.InputWrapper>
      {isError && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.Container>
  );
};

export default Input;
