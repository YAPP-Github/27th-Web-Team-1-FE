'use client';

import CheckIcon from '@/assets/images/check.svg';
import { useDisconnectContext } from '@/app/disconnect/_contexts/DisconnectContext';
import * as S from './ConfirmClient.styles';

export default function ConfirmClient() {
  const { isConfirmed, toggleConfirm } = useDisconnectContext();

  return (
    <S.Wrapper onClick={toggleConfirm}>
      <S.Circle isChecked={isConfirmed}>
        <CheckIcon width={16} height={16} />
      </S.Circle>
      <S.Label>위 내용을 모두 확인했습니다.</S.Label>
    </S.Wrapper>
  );
}
