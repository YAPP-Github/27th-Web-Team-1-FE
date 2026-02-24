'use client';

import CheckSmallIcon from '@/assets/images/checkSmall.svg';
import { useSignoutContext } from '@/app/signout/_contexts/SignoutContext';
import * as S from './SelectListClient.styles';

const REASON_OPTIONS = [
  '상대방과 헤어져서',
  '원하는 기능이 없어서',
  '버그나 오류가 많아서',
  '기타',
] as const;

export default function SelectListClient() {
  const { selectedReasons, toggleReason } = useSignoutContext();

  return (
    <S.List>
      {REASON_OPTIONS.map((reason) => (
        <S.Item key={reason} onClick={() => toggleReason(reason)}>
          <S.Circle isChecked={selectedReasons.has(reason)}>
            <CheckSmallIcon />
          </S.Circle>
          <S.Label>{reason}</S.Label>
        </S.Item>
      ))}
    </S.List>
  );
}
