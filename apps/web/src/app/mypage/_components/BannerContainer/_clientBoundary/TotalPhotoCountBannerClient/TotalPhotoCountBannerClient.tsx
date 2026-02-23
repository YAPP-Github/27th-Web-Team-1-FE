'use client';

import { useRouter } from 'next/navigation';
import { useGetMyPageSuspense } from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { type AlbumThumbnails } from '@repo/api-client';
import { ROUTES } from '@/constants';
import { DEFAULT_ALBUM_TITLE } from '@/constants/album';
import { getMapMeAlbumsQueryKey } from '@/hooks/queries/useMapMeAlbums';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import * as S from './TotalPhotoCountBannerClient.styles';

export default function TotalPhotoCountBannerClient() {
  const { data } = useGetMyPageSuspense();
  const router = useRouter();
  const queryClient = useQueryClient();
  const totalPhotoCount = data.couplePhotoCount ?? 0;

  const handleBannerClick = () => {
    const albumList =
      queryClient.getQueryData<AlbumThumbnails[]>(getMapMeAlbumsQueryKey()) ?? [];
    const allPhotosAlbum = albumList.find((album) => album.title === DEFAULT_ALBUM_TITLE);
    if (!allPhotosAlbum?.id) return;
    router.push(`${ROUTES.ALBUM.DETAIL(allPhotosAlbum.id)}?expand=true`);
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
        <S.Caption>그동안 쌓인 우리의 추억</S.Caption>
        <S.CountRow>{totalPhotoCount}개 사진</S.CountRow>
      </S.Content>
      <S.ChevronIcon>
        <ChevronRightIcon width={22} height={22} />
      </S.ChevronIcon>
    </S.Wrapper>
  );
}
