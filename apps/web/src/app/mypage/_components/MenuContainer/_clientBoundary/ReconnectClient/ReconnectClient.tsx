'use client';

import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import { COUPLE_STATUS_COOKIE } from '@/constants/cookie';
import { COUPLE_STATUS } from '@/constants/coupleStatus';
import { ROUTES } from '@/constants/routes';
import * as S from './ReconnectClient.styles';

function getCookieValue(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1];
}

export default function ReconnectClient() {
  const router = useRouter();

  const coupleStatus = getCookieValue(COUPLE_STATUS_COOKIE);
  const isDisconnectedByPartner =
    coupleStatus === COUPLE_STATUS.DISCONNECTED_BY_PARTNER ||
    coupleStatus === COUPLE_STATUS.DISCONNECTED_EXPIRED;

  if (!isDisconnectedByPartner) return null;

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
