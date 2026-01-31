/**
 * @fileoverview 사진 정보 기입 오버레이 컴포넌트
 *
 * 이 컴포넌트의 역할:
 * - 사진 선택 후 정보(위치, 메모, 앨범)를 입력하는 오버레이 UI
 * - Framer Motion으로 열기/닫기 애니메이션 처리
 * - AnimatePresence와 함께 사용하여 exit 애니메이션 지원
 *
 * 애니메이션 동작:
 * - 열기: 선택한 사진 셀 위치에서 scale 확대 + 페이드 인
 * - 닫기: scale 축소 + 페이드 아웃 (exit prop 사용)
 * - transformOrigin을 셀 중심으로 설정하여 자연스러운 확대/축소 효과
 *
 * 사용처:
 * - @modal/(.)note/page.tsx에서 인터셉트 모달로 사용
 * - AnimatePresence로 감싸서 exit 애니메이션 활성화 필요
 */
'use client';

import { PhotoAddHeader } from '@/components/header';
import * as HeaderStyles from '@/components/header/photoAdd/PhotoAddHeader.styles';
import { ROUTES } from '@/constants';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePhotoContext } from '../../../_contexts/PhotoContext';
import { PHOTO_NOTE_OVERLAY_ANIMATION_DURATION } from '../../_constants';
import useAlbumModal from '../_hooks/useAlbumModal';
import useLocationModal from '../_hooks/useLocationModal';
import useMemoModal from '../_hooks/useMemoModal';
import { usePhotoUpload } from '../_hooks/usePhotoUpload';
import { useReverseGeocode } from '../_hooks/useReverseGeocode';
import AlbumSelectOverlay from './AlbumSelectOverlay';
import LocationSelectOverlay from './LocationSelectOverlay';
import MemoModal from './MemoModal';
import * as S from './PhotoNoteOverlay.styles';

import AlbumIcon from '@/assets/images/album.svg';
import ArrowRightIcon from '@/assets/images/arrowRight.svg';
import CloseIcon from '@/assets/images/close.svg';
import MapPinIcon from '@/assets/images/mapPin.svg';
import SuccessIcon from '@/assets/images/success.svg';
import WarningIcon from '@/assets/images/warning.svg';
import { useToast } from '@/components/toast';

interface PhotoNoteOverlayProps {
  onClose: () => void;
}

export default function PhotoNoteOverlay({ onClose }: PhotoNoteOverlayProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { selectedPhoto, selectedPhotoRect } = usePhotoContext();
  const {
    memo,
    tempMemo,
    setTempMemo,
    isOpen: isMemoModalOpen,
    openModal: handleAddMemo,
    closeModal: handleMemoModalClose,
    submitMemo: handleMemoSubmit,
  } = useMemoModal();

  const {
    selectedAlbum,
    tempSelectedAlbumId,
    setTempSelectedAlbumId,
    searchQuery,
    setSearchQuery,
    albums,
    isLoading: isAlbumsLoading,
    isOpen: isAlbumModalOpen,
    openModal: handleAlbumSelect,
    closeModal: handleAlbumModalClose,
    submitAlbum: handleAlbumSubmit,
  } = useAlbumModal();

  const {
    selectedLocation,
    tempSelectedLocationId,
    setTempSelectedLocationId,
    searchQuery: locationSearchQuery,
    setSearchQuery: setLocationSearchQuery,
    locations,
    isLoading: isLocationsLoading,
    isOpen: isLocationModalOpen,
    openModal: handleAddLocation,
    closeModal: handleLocationModalClose,
    submitLocation: handleLocationSubmit,
  } = useLocationModal();

  const { data: addressData, isLoading: isAddressLoading } = useReverseGeocode({
    latitude: selectedPhoto?.location?.latitude,
    longitude: selectedPhoto?.location?.longitude,
  });

  const { mutate: uploadPhoto, isPending: isUploading } = usePhotoUpload();

  const handleUpload = () => {
    if (!selectedPhoto || !hasLocation) return;

    uploadPhoto(
      {
        photo: selectedPhoto,
        description: memo || undefined,
        albumId: selectedAlbum?.id,
      },
      {
        onSuccess: () => {
          showToast('사진이 추가되었습니다');
          if (selectedAlbum) {
            router.push(ROUTES.ALBUM.DETAIL(selectedAlbum.id));
          } else {
            router.push(ROUTES.HOME);
          }
        },
        onError: (error) => {
          console.error('Upload failed:', error);
          showToast('사진 추가에 실패했습니다. 다시 시도해주세요');
        },
      },
    );
  };

  const handleMapPreview = () => {
    if (!selectedPhoto || !hasLocation) return;

    const latitude = selectedLocation?.latitude || selectedPhoto.location?.latitude;
    const longitude = selectedLocation?.longitude || selectedPhoto.location?.longitude;

    if (latitude && longitude) {
      sessionStorage.setItem(
        'mapPreviewState',
        JSON.stringify({
          latitude,
          longitude,
          photoUrl: selectedPhoto.uri,
        }),
      );
      router.push(ROUTES.PHOTO.PREVIEW);
    }
  };

  if (!selectedPhoto) {
    return null;
  }

  const hasPhotoLocation = !!selectedPhoto.location;
  const hasSelectedLocation = !!selectedLocation;
  const hasLocation = hasPhotoLocation || hasSelectedLocation;

  const locationText = selectedLocation
    ? selectedLocation.placeName ||
      selectedLocation.roadAddress ||
      selectedLocation.address
    : addressData?.placeName || addressData?.address;

  /**
   * scale 애니메이션을 위한 초기값과 transform-origin 계산
   *
   * 동작 원리:
   * 1. 선택한 사진 셀의 위치(selectedPhotoRect)를 PhotoContext에서 가져옴
   * 2. 셀 크기 / 화면 크기 비율로 초기 scale 계산
   * 3. 셀 중심 좌표를 transform-origin으로 설정
   * 4. 이렇게 하면 셀 위치에서 확대되는 것처럼 보임
   */
  const getScaleAndOrigin = () => {
    // selectedPhotoRect가 없으면 (직접 URL 접근 등) 기본값 사용
    if (!selectedPhotoRect || typeof window === 'undefined') {
      return {
        scale: 0.9,
        originX: '50%',
        originY: '50%',
      };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 셀 크기 대비 화면 크기 비율 (작은 값 사용)
    const scaleX = selectedPhotoRect.width / viewportWidth;
    const scaleY = selectedPhotoRect.height / viewportHeight;

    // 셀 중심 위치를 transform-origin으로 사용
    const originX = selectedPhotoRect.left + selectedPhotoRect.width / 2;
    const originY = selectedPhotoRect.top + selectedPhotoRect.height / 2;

    return {
      scale: Math.min(scaleX, scaleY),
      originX: `${originX}px`,
      originY: `${originY}px`,
    };
  };

  const { scale, originX, originY } = getScaleAndOrigin();

  return (
    <motion.div
      // Framer Motion 애니메이션 설정
      // - initial: 컴포넌트 마운트 시 초기 상태 (작은 크기 + 투명)
      // - animate: 애니메이션 완료 후 상태 (전체 크기 + 불투명)
      // - exit: AnimatePresence 내에서 언마운트 시 상태 (다시 작아짐)
      initial={{ scale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale, opacity: 0 }}
      transition={{
        type: 'tween',
        duration: PHOTO_NOTE_OVERLAY_ANIMATION_DURATION / 1000,
        ease: [0.32, 0.72, 0, 1], // 커스텀 이징 (부드러운 감속)
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 100,
        overflow: 'hidden',
        // 이 지점을 중심으로 scale 변환이 일어남
        transformOrigin: `${originX} ${originY}`,
      }}
    >
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
                <HeaderStyles.CloseButton onClick={onClose}>
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
                    <S.TooltipText>
                      {hasSelectedLocation
                        ? '위치가 저장되었어요.'
                        : '위치가 자동으로 저장되었어요.'}
                    </S.TooltipText>
                    <S.TooltipButton type="button" onClick={handleAddLocation}>
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
              {memo || '메모 추가...'}
            </S.MemoButton>

            <S.AlbumButtonWrapper>
              <S.AlbumButton type="button" onClick={handleAlbumSelect}>
                <S.AlbumIcon>
                  <AlbumIcon width={22} height={22} />
                </S.AlbumIcon>
                <S.AlbumText>{selectedAlbum?.title || '앨범 선택...'}</S.AlbumText>
              </S.AlbumButton>
            </S.AlbumButtonWrapper>
          </S.MemoAlbumOverlay>
        </S.PhotoSection>

        {/* 최하단 컨테이너 (사진 밑에 위치) */}
        <S.BottomContainer>
          <S.ActionButtons>
            <S.MapPreviewButton
              type="button"
              onClick={handleMapPreview}
              disabled={!hasLocation}
            >
              <S.MapIcon>
                <MapPinIcon width={16} height={17} />
              </S.MapIcon>
              <S.MapPreviewText>지도뷰 미리보기</S.MapPreviewText>
            </S.MapPreviewButton>

            <S.UploadButton
              type="button"
              onClick={handleUpload}
              disabled={isUploading || !hasLocation}
            >
              <S.UploadIcon>
                <ArrowRightIcon width={24} height={24} />
              </S.UploadIcon>
            </S.UploadButton>
          </S.ActionButtons>
        </S.BottomContainer>
      </S.Container>

      <MemoModal
        isOpen={isMemoModalOpen}
        tempMemo={tempMemo}
        onChangeTempMemo={setTempMemo}
        onClose={handleMemoModalClose}
        onSubmit={handleMemoSubmit}
      />

      <AlbumSelectOverlay
        isOpen={isAlbumModalOpen}
        albums={albums}
        isLoading={isAlbumsLoading}
        selectedAlbumId={tempSelectedAlbumId}
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        onSelectAlbum={setTempSelectedAlbumId}
        onClose={handleAlbumModalClose}
        onSubmit={handleAlbumSubmit}
      />

      <LocationSelectOverlay
        isOpen={isLocationModalOpen}
        locations={locations}
        isLoading={isLocationsLoading}
        selectedLocationId={tempSelectedLocationId}
        searchQuery={locationSearchQuery}
        onChangeSearchQuery={setLocationSearchQuery}
        onSelectLocation={setTempSelectedLocationId}
        onClose={handleLocationModalClose}
        onSubmit={handleLocationSubmit}
      />
    </motion.div>
  );
}
