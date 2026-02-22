'use client';

import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './DisconnectClient.styles';

export default function DisconnectClient() {
  const handleClick = () => {
    // TODO: 연인 연결 끊기 로직 구현
  };

  return (
    <S.Wrapper
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <S.Label>상대방과 연결 끊기</S.Label>
      <S.ChevronIcon>
        <ChevronRightIcon width={22} height={22} />
      </S.ChevronIcon>
    </S.Wrapper>
  );
}
