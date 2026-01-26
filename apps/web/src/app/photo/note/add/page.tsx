'use client';

import { useRouter } from 'next/navigation';
import { PhotoAddHeader } from '@/components/header';
import * as HeaderStyles from '@/components/header/photoAdd/PhotoAddHeader.styles';
import { ROUTES } from '@/constants';
import { usePhotoContext } from '../../_contexts/PhotoContext';
import { useReverseGeocode } from './_hooks/useReverseGeocode';
import { usePhotoUpload } from './_hooks/usePhotoUpload';
import * as S from './page.styles';

import CloseIcon from '@/assets/images/close.svg';
import SuccessIcon from '@/assets/images/success.svg';
import WarningIcon from '@/assets/images/warning.svg';
import AlbumIcon from '@/assets/images/album.svg';
import MapPinIcon from '@/assets/images/mapPin.svg';
import ArrowRightIcon from '@/assets/images/arrowRight.svg';

// TODO: 사용자 컨텍스트에서 가져오도록 수정
const TEMP_USER_ID = 1;

export default function PhotoNoteAddPage() {
  const router = useRouter();
  const { selectedPhoto } = usePhotoContext();

  const { data: addressData, isLoading: isAddressLoading } = useReverseGeocode({
    latitude: selectedPhoto?.location?.latitude,
    longitude: selectedPhoto?.location?.longitude,
  });

  const { mutate: uploadPhoto, isPending: isUploading } = usePhotoUpload();

  const handleClose = () => {
    router.push(ROUTES.PHOTO.ADD);
  };

  const handleUpload = () => {
    if (!selectedPhoto) return;

    uploadPhoto(
      {
        photo: selectedPhoto,
        description: undefined,
        albumId: undefined,
        userId: TEMP_USER_ID,
      },
      {
        onSuccess: () => {
          router.push(ROUTES.HOME);
        },
        onError: (error) => {
          console.error('Upload failed:', error);
          // TODO: 에러 토스트 표시
        },
      },
    );
  };

  const handleAddLocation = () => {
    // TODO: 위치 추가 모달 구현
    console.log('Open location modal');
  };

  const handleEditLocation = () => {
    // TODO: 위치 수정 모달 구현
    console.log('Open location edit modal');
  };

  const handleAddMemo = () => {
    // TODO: 메모 추가 모달 구현
    console.log('Open memo modal');
  };

  const handleAlbumSelect = () => {
    // TODO: 앨범 선택 오버레이 구현
    console.log('Open album selector');
  };

  const handleMapPreview = () => {
    // TODO: 지도뷰 미리보기 구현
    console.log('Open map preview');
  };

  if (!selectedPhoto) {
    return (
      <S.EmptyContainer>
        <S.EmptyText>선택된 사진이 없습니다.</S.EmptyText>
      </S.EmptyContainer>
    );
  }

  const hasLocation = !!selectedPhoto.location;
  const locationText = addressData?.placeName || addressData?.address;

  return (
    <S.Container>
      {/* 사진 영역 */}
      <S.PhotoSection>
        <S.PhotoBackground>
          <img src={selectedPhoto.uri} alt={selectedPhoto.filename} />
        </S.PhotoBackground>

        {/* 상단 오버레이 */}
        <S.TopOverlay>
          <PhotoAddHeader
            left={
              <HeaderStyles.CloseButton onClick={handleClose}>
                <CloseIcon width={22} height={22} />
              </HeaderStyles.CloseButton>
            }
            locationText={locationText}
            isLoading={isAddressLoading}
            hasLocation={hasLocation}
          />

          {/* 말풍선 */}
          <S.TooltipWrapper>
            <S.Tooltip>
              {hasLocation ? (
                <>
                  <S.TooltipIcon>
                    <SuccessIcon width={22} height={22} />
                  </S.TooltipIcon>
                  <S.TooltipText>위치가 자동으로 저장되었어요.</S.TooltipText>
                  <S.TooltipButton type="button" onClick={handleEditLocation}>
                    위치 수정
                  </S.TooltipButton>
                </>
              ) : (
                <>
                  <S.TooltipIcon>
                    <WarningIcon width={22} height={22} />
                  </S.TooltipIcon>
                  <S.TooltipText>위치를 추가해주세요.</S.TooltipText>
                  <S.TooltipButton type="button" onClick={handleAddLocation}>
                    위치 추가
                  </S.TooltipButton>
                </>
              )}
            </S.Tooltip>
          </S.TooltipWrapper>
        </S.TopOverlay>

        {/* 메모, 앨범 오버레이 (사진에 오버레이) */}
        <S.MemoAlbumOverlay>
          <S.MemoButton type="button" onClick={handleAddMemo}>
            메모 추가...
          </S.MemoButton>

          <S.AlbumButtonWrapper>
            <S.AlbumButton type="button" onClick={handleAlbumSelect}>
              <S.AlbumIcon>
                <AlbumIcon width={22} height={22} />
              </S.AlbumIcon>
              <S.AlbumText>앨범 선택...</S.AlbumText>
            </S.AlbumButton>
          </S.AlbumButtonWrapper>
        </S.MemoAlbumOverlay>
      </S.PhotoSection>

      {/* 최하단 컨테이너 (사진 밑에 위치) */}
      <S.BottomContainer>
        <S.ActionButtons>
          <S.MapPreviewButton type="button" onClick={handleMapPreview}>
            <S.MapIcon>
              <MapPinIcon width={16} height={17} />
            </S.MapIcon>
            <S.MapPreviewText>지도뷰 미리보기</S.MapPreviewText>
          </S.MapPreviewButton>

          <S.UploadButton type="button" onClick={handleUpload} disabled={isUploading}>
            <S.UploadIcon>
              <ArrowRightIcon width={24} height={24} />
            </S.UploadIcon>
          </S.UploadButton>
        </S.ActionButtons>
      </S.BottomContainer>
    </S.Container>
  );
}
