'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGetClusterPhotosQueryOptions } from '@repo/api-client';
import MapView from '@/components/map/MapView';
import { MapPin } from '@/types/map.type';
import { ROUTES } from '@/constants/routes';
import { SHEET_CONTEXT_TYPE } from '@/components/bottomSheet/constants';
import * as S from '../page.styles';
import { useMapRouteViewState } from '../_hooks/useMapRouteViewState';
import { useMapRouteSheetContext } from '../_hooks/useMapRouteSheetContext';
import { useMapRouteData } from '../_hooks/useMapRouteData';
import { usePendingPhotosViewModel } from '@/hooks/usePendingPhotosViewModel';
import {
  calculatePhotoCount,
  calculateCenterFromAlbumPhotos,
} from '../_utils/mapRoute.calc';
import { MapRouteHeader } from './MapRouteHeader';
import { MapRouteBottomSection } from './MapRouteBottomSection';
import { AlbumAddModalContainer } from './albumAddModal/AlbumAddModalContainer';
import { AlbumRenameModalContainer } from './albumRenameModal/AlbumRenameModalContainer';
import { AlbumDeleteModalContainer } from './albumDeleteModal/AlbumDeleteModalContainer';
import LocationPermissionModal from './locationPermissionModal/LocationPermissionModal';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { validateCenterCoordinate } from '../_utils/mapRoute.calc';
import { saveClusterToSession } from '@/utils/sessionStorage';

export default function MapRoute() {
  const router = useRouter();
  const [pendingClusterId, setPendingClusterId] = useState<string | null>(null);

  // 상태 관리
  const { viewState, mapViewRef, handleViewStateChange, handleGoToCurrentLocation } =
    useMapRouteViewState();

  const { sheetContext, setSheetContext, selectedAlbumId } = useMapRouteSheetContext();

  // 데이터 페칭
  const {
    albumList,
    address,
    albumDetail,
    albumMapInfo,
    mapPins,
    totalHistoryCount,
    clusterExpansionData,
  } = useMapRouteData({
    viewState,
    sheetContext,
    selectedAlbumId,
  });

  // Pending 사진 merge (앨범 리스트 + 앨범 상세)
  const { albumList: mergedAlbumList, displayPhotos } = usePendingPhotosViewModel(
    albumList,
    albumDetail,
  );

  // 모달 상태 관리
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLocationDeniedModalOpen, setIsLocationDeniedModalOpen] = useState(false);
  const [menuAlbumId, setMenuAlbumId] = useState<number | undefined>(undefined);
  const [menuAlbumTitle, setMenuAlbumTitle] = useState<string | undefined>(undefined);

  // 앨범이 선택되었을 때 앨범의 중심 위치로 지도 이동
  useEffect(() => {
    if (!selectedAlbumId) {
      return;
    }

    // 앨범의 실제 사진 위치들로부터 중심 계산 (백엔드 centerLng/Lat가 부정확할 수 있으므로)
    let centerInfo = null;
    if (albumDetail?.photos && albumDetail.photos.length > 0) {
      centerInfo = calculateCenterFromAlbumPhotos(albumDetail.photos);
    } else if (albumMapInfo) {
      // photos 데이터가 없으면 albumMapInfo 사용
      centerInfo = validateCenterCoordinate(
        albumMapInfo.centerLongitude,
        albumMapInfo.centerLatitude,
        albumMapInfo.boundingBox,
      );
    }

    if (centerInfo) {
      handleViewStateChange({
        longitude: centerInfo.longitude,
        latitude: centerInfo.latitude,
        zoom: centerInfo.zoom,
      });
    }
  }, [selectedAlbumId, albumDetail, albumMapInfo, handleViewStateChange]);

  useEffect(() => {
    const initLocation = async () => {
      const position = await getCurrentPosition();
      if (!position) {
        setIsLocationDeniedModalOpen(true);
        return;
      }
    };
    initLocation();
  }, []);

  // 계산된 데이터
  const albumDetailById = useMemo(() => {
    if (!albumDetail?.id) return {};
    return { [albumDetail.id]: albumDetail };
  }, [albumDetail]);

  const photoCount = useMemo(() => {
    return calculatePhotoCount(sheetContext, albumDetail, 0, totalHistoryCount);
  }, [sheetContext, albumDetail, totalHistoryCount]);

  const selectedAlbumTitle = albumDetail?.title;

  const { data: clusterPhotosFromQuery, isError: isClusterQueryError } = useQuery({
    ...getGetClusterPhotosQueryOptions(pendingClusterId ?? ''),
    enabled: !!pendingClusterId && !clusterExpansionData?.has(pendingClusterId),
  });

  useEffect(() => {
    if (!pendingClusterId) return;

    if (isClusterQueryError) {
      console.error('[MapRoute] Failed to load cluster photos');
      setPendingClusterId(null);
      return;
    }

    const photos = clusterExpansionData?.get(pendingClusterId) ?? clusterPhotosFromQuery;
    if (!photos) return;

    if (!photos.length) {
      setPendingClusterId(null);
      return;
    }

    saveClusterToSession(pendingClusterId, photos);
    const firstPhotoId = photos.find((photo) => !!photo.id)?.id;
    if (!firstPhotoId) {
      setPendingClusterId(null);
      return;
    }

    router.push(ROUTES.PHOTO.VIEW_WITH_CLUSTER(firstPhotoId, pendingClusterId));
    setPendingClusterId(null);
  }, [pendingClusterId, clusterPhotosFromQuery, clusterExpansionData, isClusterQueryError, router]);

  const handlePinClick = (pin: MapPin) => {
    if (!pin.isCluster) {
      router.push(ROUTES.PHOTO.VIEW(pin.id));
      return;
    }

    const clusterId = pin.clusterId;
    if (!clusterId) return;

    setPendingClusterId(clusterId);
  };

  const handleSelectAlbum = (albumId: number) => {
    setSheetContext({ type: SHEET_CONTEXT_TYPE.ALBUM_DETAIL, albumId });
    router.push(`/album/${albumId}`);
  };

  const handleCloseAlbumDetail = () => {
    router.back();
  };

  const handleOpenAlbumRename = () => {
    setIsRenameModalOpen(true);
  };

  const handleOpenAlbumDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleGridAlbumRename = (albumId: number, albumTitle: string) => {
    setMenuAlbumId(albumId);
    setMenuAlbumTitle(albumTitle);
    setIsRenameModalOpen(true);
  };

  const handleGridAlbumDelete = (albumId: number) => {
    setMenuAlbumId(albumId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseRenameModal = () => {
    setIsRenameModalOpen(false);
    setMenuAlbumId(undefined);
    setMenuAlbumTitle(undefined);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMenuAlbumId(undefined);
  };

  const handleCloseLocationDeniedModal = () => {
    setIsLocationDeniedModalOpen(false);
  };

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <MapRouteHeader
          sheetContext={sheetContext}
          selectedAlbumTitle={selectedAlbumTitle}
          address={address}
          onCloseAlbumDetail={handleCloseAlbumDetail}
          onOpenAlbumRename={handleOpenAlbumRename}
          onOpenAlbumDelete={handleOpenAlbumDelete}
        />
      </S.HeaderContainer>

      {viewState && (
        <MapView
          ref={mapViewRef}
          locationState={viewState}
          pins={mapPins}
          onPinClick={handlePinClick}
          onViewStateChange={handleViewStateChange}
        />
      )}

      <MapRouteBottomSection
        sheetContext={sheetContext}
        albumList={mergedAlbumList}
        albumDetailById={albumDetailById}
        photoCount={photoCount}
        displayPhotos={displayPhotos}
        onChangeContext={setSheetContext}
        onSelectAlbum={handleSelectAlbum}
        onGoToCurrentLocation={handleGoToCurrentLocation}
        onOpenAddAlbumModal={() => setIsAddModalOpen(true)}
        onRenameAlbum={handleGridAlbumRename}
        onDeleteAlbum={handleGridAlbumDelete}
        clusterExpansionData={clusterExpansionData}
      />

      <AlbumAddModalContainer
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <AlbumRenameModalContainer
        isOpen={isRenameModalOpen}
        onClose={handleCloseRenameModal}
        selectedAlbumId={menuAlbumId ?? selectedAlbumId ?? undefined}
        initialTitle={menuAlbumTitle ?? selectedAlbumTitle}
      />
      <AlbumDeleteModalContainer
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        selectedAlbumId={menuAlbumId ?? selectedAlbumId ?? undefined}
      />
      <LocationPermissionModal
        isOpen={isLocationDeniedModalOpen}
        onClose={handleCloseLocationDeniedModal}
      />
    </S.Wrapper>
  );
}
