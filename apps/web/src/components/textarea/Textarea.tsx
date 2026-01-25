'use client';

import { ChangeEvent, useId } from 'react';
import * as S from './Textarea.styles';

const DEFAULT_MAX_LENGTH = 1000;

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /** textarea 값 */
  value: string;
  /** onChange 핸들러 */
  onChange: (value: string) => void;
  /** 최대 글자 수 */
  max?: number;
  /** 에러 메시지 (값이 있으면 에러 상태로 표시) */
  errorMessage?: string;
}

const Textarea = ({
  value,
  onChange,
  max = DEFAULT_MAX_LENGTH,
  errorMessage,
  id,
  ...rest
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const isError = !!errorMessage;
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= max) {
      onChange(newValue);
    }
  };

  return (
    <S.Container>
      <S.TextareaWrapper htmlFor={textareaId} isError={isError}>
        <S.StyledTextarea {...rest} id={textareaId} value={value} onChange={handleChange} />
        <S.TextareaFooter>
          <S.CharCount>
            <S.CurrentCount>{value.length}</S.CurrentCount>
            <S.MaxCount> / {max}</S.MaxCount>
          </S.CharCount>
        </S.TextareaFooter>
      </S.TextareaWrapper>
      {isError && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.Container>
  );
};

export default Textarea;
