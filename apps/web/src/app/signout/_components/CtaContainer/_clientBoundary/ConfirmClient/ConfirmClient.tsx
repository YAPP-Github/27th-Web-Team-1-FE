'use client';

import { useState } from 'react';
import CheckIcon from '@/assets/images/check.svg';
import * as S from './ConfirmClient.styles';

export default function ConfirmClient() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <S.Wrapper onClick={() => setIsChecked((prev) => !prev)}>
      <S.Circle isChecked={isChecked}>
        <CheckIcon width={16} height={16} />
      </S.Circle>
      <S.Label>주의 사항을 모두 확인하였습니다.</S.Label>
    </S.Wrapper>
  );
}
