'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGetPhotoDetail } from '@repo/api-client';
import { PhotoAddHeader } from '@/components/header';
import * as HeaderStyles from '@/components/header/photoAdd/PhotoAddHeader.styles';
import { ROUTES } from '@/constants';
import MemoModal from '../../add/note/_components/MemoModal';
import AlbumSelectOverlay from '../../add/note/_components/AlbumSelectOverlay';
import LocationSelectOverlay from '../../add/note/_components/LocationSelectOverlay';
import useMemoModal from '../../add/note/_hooks/useMemoModal';
import useAlbumModal from '../../add/note/_hooks/useAlbumModal';
import useLocationModal from '../../add/note/_hooks/useLocationModal';
import * as S from './PhotoEditOverlay.styles';

import CloseIcon from '@/assets/images/close.svg';
import SuccessIcon from '@/assets/images/success.svg';
import ArrowRightIcon from '@/assets/images/arrowRight.svg';
import AlbumIcon from '@/assets/images/album.svg';
import MapPinIcon from '@/assets/images/mapPin.svg';
import type { PhotoLocation } from '@/app/photo/add/_types/photo';

interface PhotoEditOverlayProps {
  photoId: number;
  onClose: () => void;
  onSave: (data: {
    photoId: number;
    memo?: string;
    albumId?: number;
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
  const router = useRouter();
  const { data: photoDetail, isLoading } = useGetPhotoDetail(photoId);
  const {
    memo,
    tempMemo,
    setTempMemo,
    isOpen: isMemoModalOpen,
    openModal: handleAddMemo,
    closeModal: handleMemoModalClose,
    submitMemo: handleMemoSubmit,
  } = useMemoModal(photoDetail?.description || '');

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
    setSelectedLocation,
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

  // photoDetail이 로드되면 기존 좌표값으로 초기화
  useEffect(() => {
    if (
      photoDetail?.latitude != null &&
      photoDetail?.longitude != null &&
      !selectedLocation
    ) {
      setSelectedLocation({
        latitude: photoDetail.latitude,
        longitude: photoDetail.longitude,
        address: photoDetail.address,
      });
    }
  }, [photoDetail, selectedLocation, setSelectedLocation]);

  const handleMapPreview = () => {
    if (!photoDetail || !selectedLocation) return;

    const latitude = selectedLocation.latitude;
    const longitude = selectedLocation.longitude;

    if (latitude && longitude) {
      sessionStorage.setItem(
        'mapPreviewState',
        JSON.stringify({
          latitude,
          longitude,
          photoUrl: photoDetail.url || '',
        }),
      );
      router.push(ROUTES.PHOTO.PREVIEW);
    }
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
      albumId: selectedAlbum?.id,
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
    ? selectedLocation.placeName ||
      selectedLocation.roadAddress ||
      selectedLocation.address
    : photoDetail.address;

  const isMemoModified = memo !== (photoDetail.description || '');
  const isAlbumModified = selectedAlbum !== null;
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
              <S.AlbumButton type="button" onClick={handleAlbumSelect}>
                <S.AlbumIcon>
                  <AlbumIcon width={22} height={22} />
                </S.AlbumIcon>
                <S.AlbumText>
                  {selectedAlbum?.title || photoDetail.albumName || '앨범 선택...'}
                </S.AlbumText>
              </S.AlbumButton>
            </S.AlbumButtonWrapper>
          </S.MemoAlbumOverlay>
        </S.PhotoSection>

        <S.BottomContainer>
          <S.ActionButtons>
            <S.MapPreviewButton
              type="button"
              onClick={handleMapPreview}
              disabled={!selectedLocation}
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
    </motion.div>
  );
}
