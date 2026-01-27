'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import AlbumIcon from '@/assets/images/album.svg';
import CommentIcon from '@/assets/images/comment.svg';
import DateIcon from '@/assets/images/date.svg';
import Chip from '@/components/buttons/chip/Chip';
import MenuHeader from '@/components/header/menu/MenuHeader';
import { useLongPress, usePhotoData, usePhotoSlider } from './_hooks';
import * as S from './page.styles';

export default function PhotoViewPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const photoId = Number(params.photoId);
  const albumIdFromQuery = searchParams.get('albumId')
    ? Number(searchParams.get('albumId'))
    : undefined;

  const { photoDetail, photos, isPhotoLoading } = usePhotoData({
    photoId,
    albumIdFromQuery,
  });

  const {
    currentPhotoIndex,
    currentPhoto,
    thumbnailContainerRef,
    handlePrevPhoto,
    handleNextPhoto,
    handleThumbnailClick,
  } = usePhotoSlider({ photos, initialPhotoId: photoId });

  const { isOverlayVisible, longPressHandlers } = useLongPress();

  const displayPhotoUrl = currentPhoto?.url || photoDetail?.url;

  const handleBack = () => {
    router.back();
  };

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
    <S.Container {...longPressHandlers}>
      <S.PhotoBackground $url={displayPhotoUrl || ''} />

      <S.TouchAreaLeft onClick={handlePrevPhoto} />
      <S.TouchAreaRight onClick={handleNextPhoto} />

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
