'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  getGetPhotosQueryKey,
  getGetSelectableAlbumsQueryKey,
  useGetPhotoDetail,
  useGetPhotos,
  useGetSelectableAlbums,
} from '@repo/api-client';
import AlbumIcon from '@/assets/images/album.svg';
import CommentIcon from '@/assets/images/comment.svg';
import DateIcon from '@/assets/images/date.svg';
import Chip from '@/components/buttons/chip/Chip';
import MenuHeader from '@/components/header/menu/MenuHeader';
import * as S from './page.styles';

const LONG_PRESS_DURATION = 1500;
// TODO: 사용자 컨텍스트에서 가져오도록 수정
const TEMP_USER_ID = 1;

export default function PhotoViewPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const photoId = Number(params.photoId);
  const albumIdFromQuery = searchParams.get('albumId')
    ? Number(searchParams.get('albumId'))
    : undefined;

  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const { data: photoDetail, isLoading: isPhotoLoading } = useGetPhotoDetail(photoId);

  // 앨범 목록 조회 (albumId가 없을 때 albumName으로 찾기 위함)
  const selectableAlbumsParams = { userId: TEMP_USER_ID };
  const { data: selectableAlbums } = useGetSelectableAlbums(selectableAlbumsParams, {
    query: {
      queryKey: getGetSelectableAlbumsQueryKey(selectableAlbumsParams),
      enabled: !albumIdFromQuery && !!photoDetail?.albumName,
    },
  });

  // albumId 결정: 쿼리 파라미터 우선, 없으면 albumName으로 매칭
  const albumId = useMemo(() => {
    if (albumIdFromQuery) return albumIdFromQuery;

    if (selectableAlbums?.albums && photoDetail?.albumName) {
      const matchedAlbum = selectableAlbums.albums.find(
        (album) => album.title === photoDetail.albumName
      );
      return matchedAlbum?.id;
    }

    return undefined;
  }, [albumIdFromQuery, selectableAlbums?.albums, photoDetail?.albumName]);

  const albumParams = { albumId: albumId ?? 0 };
  const { data: albumPhotos } = useGetPhotos(albumParams, {
    query: {
      queryKey: getGetPhotosQueryKey(albumParams),
      enabled: !!albumId,
    },
  });

  const photos = useMemo(() => {
    if (!albumPhotos?.albums?.[0]?.photos) return [];
    return albumPhotos.albums[0].photos;
  }, [albumPhotos]);

  const currentPhoto = useMemo(() => {
    if (photos.length > 0) {
      return photos[currentPhotoIndex];
    }
    return null;
  }, [photos, currentPhotoIndex]);

  const displayPhotoUrl = currentPhoto?.url || photoDetail?.url;

  useEffect(() => {
    if (photos.length > 0 && photoId) {
      const index = photos.findIndex((p) => p.id === photoId);
      if (index !== -1) {
        setCurrentPhotoIndex(index);
      }
    }
  }, [photos, photoId]);

  useEffect(() => {
    if (thumbnailContainerRef.current && photos.length > 0) {
      const container = thumbnailContainerRef.current;
      const thumbnailWidth = 40;
      const activeThumbnailWidth = 56;
      const gap = 8;
      const containerWidth = container.offsetWidth;
      const scrollPosition =
        currentPhotoIndex * (thumbnailWidth + gap) -
        containerWidth / 2 +
        activeThumbnailWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [currentPhotoIndex, photos.length]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleLeftAreaClick = useCallback(() => {
    if (photos.length > 0 && currentPhotoIndex > 0) {
      setCurrentPhotoIndex((prev) => prev - 1);
    }
  }, [photos.length, currentPhotoIndex]);

  const handleRightAreaClick = useCallback(() => {
    if (photos.length > 0 && currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex((prev) => prev + 1);
    }
  }, [photos.length, currentPhotoIndex]);

  const handleLongPressStart = useCallback(() => {
    longPressTimerRef.current = setTimeout(() => {
      setIsOverlayVisible(false);
    }, LONG_PRESS_DURATION);
  }, []);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    longPressTimerRef.current = setTimeout(() => {
      setIsOverlayVisible(true);
    }, LONG_PRESS_DURATION);
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
  }, []);

  if (isPhotoLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>불러오는 중...</S.LoadingContainer>
      </S.Container>
    );
  }

  if (!photoDetail) {
    return (
      <S.Container>
        <S.LoadingContainer>사진을 찾을 수 없습니다.</S.LoadingContainer>
      </S.Container>
    );
  }

  return (
    <S.Container
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      onMouseLeave={handleLongPressEnd}
      onTouchStart={handleLongPressStart}
      onTouchEnd={handleLongPressEnd}
    >
      <S.PhotoBackground $url={displayPhotoUrl || ''} />

      <S.TouchAreaLeft onClick={handleLeftAreaClick} />
      <S.TouchAreaRight onClick={handleRightAreaClick} />

      {isOverlayVisible && (
        <>
          <S.HeaderWrapper>
            <MenuHeader
              title={photoDetail.address || ''}
              onClickBack={handleBack}
              showLocation={!!photoDetail.address}
            >
              <MenuHeader.Menu>
                <MenuHeader.Item>다운로드</MenuHeader.Item>
                <MenuHeader.Item color="#FF4D5F">삭제</MenuHeader.Item>
              </MenuHeader.Menu>
            </MenuHeader>
          </S.HeaderWrapper>

          <S.BottomOverlay>
            <S.ContainerA>
              <S.UploaderInfo>
                <S.ProfileImage />
                <S.UploaderName>{photoDetail.uploaderName || '알 수 없음'}</S.UploaderName>
              </S.UploaderInfo>
              {photoDetail.description && <S.Memo>{photoDetail.description}</S.Memo>}
            </S.ContainerA>

            <S.ContainerB>
              <Chip
                text={photoDetail.takenAt || '날짜 없음'}
                variant="white"
                size="small"
                icon={<DateIcon width={14} height={14} />}
              />
              <Chip
                text={photoDetail.albumName || '앨범 없음'}
                variant="white"
                size="small"
                icon={<AlbumIcon width={14} height={14} />}
              />
              <Chip
                text="댓글 추가..."
                variant="white"
                size="small"
                icon={<CommentIcon width={14} height={14} />}
                onClick={() => {}}
              />
            </S.ContainerB>

            {photos.length > 1 && (
              <S.SliderWrapper>
                <S.ThumbnailSlider ref={thumbnailContainerRef}>
                  {photos.map((photo, index) => (
                    <S.ThumbnailItem
                      key={photo.id}
                      $isActive={index === currentPhotoIndex}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <S.ThumbnailImage src={photo.url} alt="" />
                    </S.ThumbnailItem>
                  ))}
                </S.ThumbnailSlider>
              </S.SliderWrapper>
            )}
          </S.BottomOverlay>
        </>
      )}
    </S.Container>
  );
}
