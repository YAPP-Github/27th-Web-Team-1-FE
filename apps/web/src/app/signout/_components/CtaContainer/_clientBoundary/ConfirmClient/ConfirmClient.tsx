'use client';

import CheckIcon from '@/assets/images/check.svg';
import { useSignoutContext } from '@/app/signout/_contexts/SignoutContext';
import * as S from './ConfirmClient.styles';

export default function ConfirmClient() {
  const { isConfirmed, toggleConfirm } = useSignoutContext();

  return (
    <S.Wrapper onClick={toggleConfirm}>
      <S.Circle isChecked={isConfirmed}>
        <CheckIcon width={16} height={16} />
      </S.Circle>
      <S.Label>주의 사항을 모두 확인하였습니다.</S.Label>
    </S.Wrapper>
  );
}
