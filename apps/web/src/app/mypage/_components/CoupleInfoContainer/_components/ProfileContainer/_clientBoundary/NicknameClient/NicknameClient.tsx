'use client';

import * as S from './NicknameClient.styles';

interface NicknameClientProps {
  username?: string;
}

export default function NicknameClient({ username }: NicknameClientProps) {
  return <S.Text>{username ?? ''}</S.Text>;
}
