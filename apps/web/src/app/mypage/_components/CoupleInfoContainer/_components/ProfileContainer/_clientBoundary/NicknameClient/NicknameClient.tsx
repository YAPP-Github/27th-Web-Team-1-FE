'use client';

import EditIcon from '@/assets/images/edit.svg';
import * as S from './NicknameClient.styles';

interface NicknameClientProps {
  username?: string;
}

export default function NicknameClient({ username }: NicknameClientProps) {
  const handleNicknameEdit = () => {
    // TODO: 닉네임 수정 로직 구현
  };

  return (
    <S.Wrapper onClick={handleNicknameEdit}>
      <S.Text>{username ?? ''}</S.Text>
      <S.EditIcon>
        <EditIcon width={12} height={12} />
      </S.EditIcon>
    </S.Wrapper>
  );
}
