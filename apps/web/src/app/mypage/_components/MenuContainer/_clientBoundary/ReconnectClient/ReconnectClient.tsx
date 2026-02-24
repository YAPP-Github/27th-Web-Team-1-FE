'use client';

import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import { ROUTES } from '@/constants/routes';
import * as S from './ReconnectClient.styles';

export default function ReconnectClient() {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.RECONNECT);
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
