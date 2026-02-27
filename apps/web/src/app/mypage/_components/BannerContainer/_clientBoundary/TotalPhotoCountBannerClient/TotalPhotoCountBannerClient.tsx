'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetMyPageSuspense,
  getMapMe,
  getGetMapMeQueryKey,
  type MapMeResponse,
} from '@repo/api-client';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/constants';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './TotalPhotoCountBannerClient.styles';

const DEFAULT_MAP_PARAMS = { longitude: 126.978, latitude: 37.5665, zoom: 15 };

export default function TotalPhotoCountBannerClient() {
  const { data } = useGetMyPageSuspense();
  const router = useRouter();
  const totalPhotoCount = data.couplePhotoCount ?? 0;
  const defaultAlbumId = data.defaultAlbumId;
  const [randomSeed] = useState(() => Math.random());

  const selectRandomThumbnail = useCallback(
    (mapData: MapMeResponse) => {
      const album = mapData.albums?.find((a) => a.id === defaultAlbumId);
      const urls = album?.thumbnailUrls ?? [];
      if (urls.length === 0) return undefined;
      return urls[Math.floor(randomSeed * urls.length)];
    },
    [defaultAlbumId, randomSeed],
  );

  const { data: backgroundImage } = useQuery({
    queryKey: getGetMapMeQueryKey(DEFAULT_MAP_PARAMS),
    queryFn: ({ signal }) => getMapMe(DEFAULT_MAP_PARAMS, signal),
    select: selectRandomThumbnail,
  });

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
