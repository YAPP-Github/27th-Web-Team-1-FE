'use client';

import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './DdayBannerClient.styles';

interface DdayBannerClientProps {
  dday: number;
}

export default function DdayBannerClient({ dday }: DdayBannerClientProps) {
  const handleBannerClick = () => {
    // TODO: D-day 배너 클릭 로직 구현
  };

  return (
    <S.Wrapper
      role="button"
      tabIndex={0}
      onClick={handleBannerClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBannerClick();
        }
      }}
    >
      <S.Content>
        <S.Caption>처음 로킷을 시작한 날부터</S.Caption>
        <S.DdayRow>
          <S.DdayPrefix>D+</S.DdayPrefix>
          <S.DdayNumber>{dday}</S.DdayNumber>
        </S.DdayRow>
      </S.Content>
      <S.ChevronIcon>
        <ChevronRightIcon width={22} height={22} />
      </S.ChevronIcon>
    </S.Wrapper>
  );
}
