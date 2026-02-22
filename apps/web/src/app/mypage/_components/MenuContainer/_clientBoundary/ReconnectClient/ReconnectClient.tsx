'use client';

import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './ReconnectClient.styles';

interface ReconnectClientProps {
  isShow?: boolean;
}

export default function ReconnectClient({ isShow = false }: ReconnectClientProps) {
  if (!isShow) return null;

  const handleClick = () => {
    // TODO: 재연결 로직 구현
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
      <S.Label>재연결하기</S.Label>
      <S.ChevronIcon>
        <ChevronRightIcon width={22} height={22} />
      </S.ChevronIcon>
    </S.Wrapper>
  );
}
