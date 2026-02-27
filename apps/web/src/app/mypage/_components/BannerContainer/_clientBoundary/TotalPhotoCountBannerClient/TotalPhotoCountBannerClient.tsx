'use client';

import { useRouter } from 'next/navigation';
import { useGetMyPageSuspense } from '@repo/api-client';
import { ROUTES } from '@/constants';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './TotalPhotoCountBannerClient.styles';

export default function TotalPhotoCountBannerClient() {
  const { data } = useGetMyPageSuspense();
  const router = useRouter();
  const totalPhotoCount = data.couplePhotoCount ?? 0;
  const defaultAlbumId = data.defaultAlbumId;
  const backgroundImage = data.backgroundImageUrl;

  const handleBannerClick = () => {
    if (defaultAlbumId === null || defaultAlbumId === undefined) {
      return;
    }
    router.push(`${ROUTES.ALBUM.DETAIL(defaultAlbumId)}?expand=true`);
  };

  return (
    <S.Wrapper
      $backgroundImage={backgroundImage}
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
        <S.Caption>그동안 쌓인 우리의 추억</S.Caption>
        <S.CountRow>{totalPhotoCount}개 사진</S.CountRow>
      </S.Content>
      <S.ChevronIcon>
        <ChevronRightIcon width={22} height={22} />
      </S.ChevronIcon>
    </S.Wrapper>
  );
}
