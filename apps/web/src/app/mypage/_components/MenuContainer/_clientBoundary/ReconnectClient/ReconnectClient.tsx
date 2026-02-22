'use client';

import * as S from './ReconnectClient.styles';

interface ReconnectClientProps {
  isShow?: boolean;
}

export default function ReconnectClient({
  isShow = false,
}: ReconnectClientProps) {
  if (!isShow) return null;

  return <S.Wrapper>ReconnectClient</S.Wrapper>;
}
