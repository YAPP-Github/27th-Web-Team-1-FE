'use client';

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { isDigit, isValidInviteCode } from '@/utils/inviteCode';
import * as S from './CodeInput.styles';

const CODE_LENGTH = 6;

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  length?: number;
}

export default function CodeInput({
  value,
  onChange,
  onComplete,
  length = CODE_LENGTH,
}: CodeInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.padEnd(length, ' ').split('').slice(0, length);

  useEffect(() => {
    if (isValidInviteCode(value, length)) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChange = (index: number, digit: string) => {
    if (digit && !isDigit(digit)) return;

    const newValue = digits
      .map((d, i) => (i === index ? digit : d))
      .join('')
      .trim();
    onChange(newValue);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index]?.trim() && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newValue = digits
        .map((d, i) => (i === index ? '' : d))
        .join('')
        .trim();
      onChange(newValue);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    if (isValidInviteCode(pastedData, length)) {
      onChange(pastedData);
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <S.Container>
      {digits.map((digit, index) => (
        <S.Input
          key={index}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit.trim()}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          isFocused={focusedIndex === index}
        />
      ))}
    </S.Container>
  );
}
