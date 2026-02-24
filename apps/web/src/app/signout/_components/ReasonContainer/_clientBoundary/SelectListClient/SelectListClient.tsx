'use client';

import { useState } from 'react';
import CheckSmallIcon from '@/assets/images/checkSmall.svg';
import * as S from './SelectListClient.styles';

const REASON_OPTIONS = [
  '상대방과 헤어져서',
  '원하는 기능이 없어서',
  '버그나 오류가 많아서',
  '기타',
] as const;

export default function SelectListClient() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSelect = (reason: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(reason)) {
        next.delete(reason);
      } else {
        next.add(reason);
      }
      return next;
    });
  };

  return (
    <S.List>
      {REASON_OPTIONS.map((reason) => (
        <S.Item key={reason} onClick={() => handleSelect(reason)}>
          <S.Circle isChecked={selected.has(reason)}>
            <CheckSmallIcon />
          </S.Circle>
          <S.Label>{reason}</S.Label>
        </S.Item>
      ))}
    </S.List>
  );
}
