'use client';

import { PhotoAddHeader } from '@/components/header';
import * as HeaderStyles from '@/components/header/photoAdd/PhotoAddHeader.styles';
import { useGetPhotoDetail } from '@repo/api-client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { STATE_SOURCE } from '../../_constants/stateSource';
import { usePhotoContext } from '../../_contexts/PhotoContext';
import AlbumSelectOverlay from '../../add/note/_components/AlbumSelectOverlay';
import LocationSelectOverlay from '../../add/note/_components/LocationSelectOverlay';
import MemoModal from '../../add/note/_components/MemoModal';
import useAlbumModal from '../../add/note/_hooks/useAlbumModal';
import useLocationModal from '../../add/note/_hooks/useLocationModal';
import useMemoModal from '../../add/note/_hooks/useMemoModal';
import * as S from './PhotoEditOverlay.styles';

import type { PhotoLocation } from '@/app/photo/add/_types/photo';
import AlbumSmallIcon from '@/assets/images/albumSmall.svg';
import ArrowRightIcon from '@/assets/images/arrowRight.svg';
import CloseIcon from '@/assets/images/close.svg';
import CloseSmallIcon from '@/assets/images/closeSmall.svg';
import MapPinIcon from '@/assets/images/mapPin.svg';
import SuccessIcon from '@/assets/images/success.svg';
import MapPreviewSheet from '@/components/map/mapPreview/MapPreviewSheet';

interface PhotoEditOverlayProps {
  photoId: number;
  onClose: () => void;
  onSave: (data: {
    photoId: number;
    memo?: string;
    albumId?: number | null;
    location: PhotoLocation;
  }) => void;
  isSaving?: boolean;
}

export default function PhotoEditOverlay({
  photoId,
  onClose,
  onSave,
  isSaving = false,
}: PhotoEditOverlayProps) {
  const { initPhotoEditState, isEditStateInitialized } = usePhotoContext();
  const { data: photoDetail, isLoading } = useGetPhotoDetail(photoId);

  // photoDetail이 로드되면 photoEditState 초기화 (최초 1회만)
  // 지도뷰 미리보기에서 복귀 시에는 이미 초기화되어 있으므로 스킵
  useEffect(() => {
    if (photoDetail && !isEditStateInitialized) {
      initPhotoEditState({
        memo: photoDetail.description || '',
        selectedAlbum: null, // API에서 albumId를 제공하지 않아서 초기 선택 불가
        selectedLocation:
          photoDetail.latitude != null && photoDetail.longitude != null
            ? {
                latitude: photoDetail.latitude,
                longitude: photoDetail.longitude,
                address: photoDetail.address,
              }
            : null,
      });
    }
  }, [photoDetail, isEditStateInitialized, initPhotoEditState]);

  const {
    memo,
    tempMemo,
    setTempMemo,
    isOpen: isMemoModalOpen,
    openModal: handleAddMemo,
    closeModal: handleMemoModalClose,
    submitMemo: handleMemoSubmit,
  } = useMemoModal({ stateSource: STATE_SOURCE.EDIT });

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
    resetAlbum: handleAlbumReset,
  } = useAlbumModal({ stateSource: STATE_SOURCE.EDIT });

  const [isAlbumCleared, setIsAlbumCleared] = useState(false);
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);

  // 앨범 선택 시 cleared 상태 해제 (렌더 중 상태 조정 패턴)
  const [prevSelectedAlbum, setPrevSelectedAlbum] = useState(selectedAlbum);
  if (prevSelectedAlbum !== selectedAlbum) {
    setPrevSelectedAlbum(selectedAlbum);
    if (selectedAlbum) setIsAlbumCleared(false);
  }

  const albumDisplayName = isAlbumCleared
    ? null
    : selectedAlbum?.title || photoDetail?.albumName;

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
  } = useLocationModal({ stateSource: STATE_SOURCE.EDIT });

  const handleMapPreview = () => {
    if (!photoDetail) return;
    setIsMapPreviewOpen(true);
  };

  const handleSave = () => {
    const latitude = selectedLocation?.latitude;
    const longitude = selectedLocation?.longitude;
    const hasValidLocation = latitude != null && longitude != null;

    if (!hasValidLocation) {
      return;
    }

    onSave({
      photoId,
      memo: memo || undefined,
      albumId: isAlbumCleared ? null : selectedAlbum?.id,
      location: { latitude, longitude },
    });
  };

  if (isLoading || !photoDetail) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)',
        }}
      >
        불러오는 중...
      </motion.div>
    );
  }

  const hasLocation = !!photoDetail.address || !!selectedLocation;
  const locationText = selectedLocation
    ? selectedLocation.roadAddress ||
      selectedLocation.address ||
      selectedLocation.placeName
    : photoDetail.address;

  const isMemoModified = memo !== (photoDetail.description || '');
  const isAlbumModified = selectedAlbum !== null || isAlbumCleared;
  const isLocationModified = selectedLocation !== null;
  const isModified = isMemoModified || isAlbumModified || isLocationModified;

  const getTooltipText = () => {
    if (isModified) {
      return '위치가 수정되었어요.';
    }
    if (hasLocation) {
      return '위치가 저장되어 있어요.';
    }
    return '위치를 추가해주세요.';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100dvh',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      <S.Container>
        <S.PhotoSection>
          <S.PhotoBackground>
            <img src={photoDetail.url} alt="" />
          </S.PhotoBackground>

          <S.TopOverlay>
            <PhotoAddHeader
              left={
                <HeaderStyles.CloseButton onClick={onClose}>
                  <CloseIcon width={22} height={22} />
                </HeaderStyles.CloseButton>
              }
              locationText={locationText}
              isLoading={false}
              hasLocation={hasLocation}
              onClickLocation={handleAddLocation}
            />

            <S.TooltipWrapper>
              <S.Tooltip>
                <S.TooltipIcon>
                  <SuccessIcon width={22} height={22} />
                </S.TooltipIcon>
                <S.TooltipText>{getTooltipText()}</S.TooltipText>
                <S.TooltipButton type="button" onClick={handleAddLocation}>
                  위치 수정
                </S.TooltipButton>
              </S.Tooltip>
            </S.TooltipWrapper>
          </S.TopOverlay>

          <S.MemoAlbumOverlay>
            <S.MemoButton type="button" onClick={handleAddMemo}>
              {memo || '메모 추가...'}
            </S.MemoButton>

            <S.AlbumButtonWrapper>
              <S.AlbumButton onClick={handleAlbumSelect}>
                <S.AlbumIcon>
                  <AlbumSmallIcon />
                </S.AlbumIcon>
                <S.AlbumText>{albumDisplayName || '앨범 선택...'}</S.AlbumText>
                {albumDisplayName && (
                  <S.AlbumResetButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAlbumCleared(true);
                      handleAlbumReset();
                    }}
                  >
                    <CloseSmallIcon />
                  </S.AlbumResetButton>
                )}
              </S.AlbumButton>
            </S.AlbumButtonWrapper>
          </S.MemoAlbumOverlay>
        </S.PhotoSection>

        <S.BottomContainer>
          <S.ActionButtons>
            <S.MapPreviewButton
              type="button"
              onClick={handleMapPreview}
              disabled={!photoDetail}
            >
              <S.MapIcon>
                <MapPinIcon width={16} height={17} />
              </S.MapIcon>
              <S.MapPreviewText>지도뷰 미리보기</S.MapPreviewText>
            </S.MapPreviewButton>

            <S.SaveButton
              type="button"
              onClick={handleSave}
              disabled={isSaving || !selectedLocation}
            >
              <S.SaveIcon>
                <ArrowRightIcon width={24} height={24} />
              </S.SaveIcon>
            </S.SaveButton>
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

      <MapPreviewSheet
        isOpen={isMapPreviewOpen}
        photoUrl={photoDetail.url || ''}
        onClose={() => setIsMapPreviewOpen(false)}
      />
    </motion.div>
  );
}
