'use client';

import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './TotalPhotoCountBannerClient.styles';

interface TotalPhotoCountBannerClientProps {
  totalPhotoCount?: number;
  photoUrl?: string;
}

export default function TotalPhotoCountBannerClient({
  totalPhotoCount = 0,
  photoUrl,
}: TotalPhotoCountBannerClientProps) {
  const handleBannerClick = () => {
    // TODO: 사진 배너 클릭 로직 구현
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
      $photoUrl={photoUrl}
    >
      <S.Content>
        <S.Caption>그동안 쌓인 우리의 추억</S.Caption>
        <S.CountRow>{totalPhotoCount}개 사진</S.CountRow>
      </S.Content>
      <S.ChevronIcon>
        <ChevronRightIcon width={22} height={22} />
      </S.ChevronIcon>
    </S.Wrapper>
  );
}
