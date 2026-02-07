'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import MapView from '@/components/map/MapView';
import { MapPin } from '@/types/map.type';
import { ROUTES } from '@/constants/routes';
import { SHEET_CONTEXT_TYPE } from '@/components/bottomSheet/constants';
import { DEFAULT_ZOOM } from '../constants';
import * as S from '../page.styles';
import { useMapRouteViewState } from '../_hooks/useMapRouteViewState';
import { useMapRouteSheetContext } from '../_hooks/useMapRouteSheetContext';
import { useMapRouteData } from '../_hooks/useMapRouteData';
import { calculatePhotoCount } from '../_utils/mapRoute.calc';
import { MapRouteHeader } from './MapRouteHeader';
import { MapRouteBottomSection } from './MapRouteBottomSection';
import { AlbumAddModalContainer } from './albumAddModal/AlbumAddModalContainer';
import { AlbumRenameModalContainer } from './albumRenameModal/AlbumRenameModalContainer';
import { AlbumDeleteModalContainer } from './albumDeleteModal/AlbumDeleteModalContainer';
import LocationPermissionModal from './locationPermissionModal/LocationPermissionModal';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { validateCenterCoordinate } from '../_utils/mapRoute.calc';

export default function MapRoute() {
  const router = useRouter();

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
    clusterLocationData,
    clusterPhotosData,
  } = useMapRouteData({
    viewState,
    sheetContext,
    selectedAlbumId,
  });

  // 모달 상태 관리
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLocationDeniedModalOpen, setIsLocationDeniedModalOpen] = useState(false);

  // 앨범이 선택되었을 때 앨범의 중심 위치로 지도 이동
  useEffect(() => {
    if (!viewState || !selectedAlbumId || !albumMapInfo) return;

    // centerLongitude/centerLatitude가 boundingBox 범위 내에 있는지 검증
    // 범위를 벗어나면 boundingBox에서 중심 계산
    const centerInfo = validateCenterCoordinate(
      albumMapInfo.centerLongitude,
      albumMapInfo.centerLatitude,
      albumMapInfo.boundingBox,
    );

    if (centerInfo) {
      handleViewStateChange({
        longitude: centerInfo.longitude,
        latitude: centerInfo.latitude,
        zoom: centerInfo.zoom,
      });
    }
  }, [selectedAlbumId, albumMapInfo, handleViewStateChange]);

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
    const clusterPhotoCount = clusterPhotosData?.length ?? 0;
    return calculatePhotoCount(
      sheetContext,
      albumDetail,
      clusterPhotoCount,
      totalHistoryCount,
    );
  }, [sheetContext, albumDetail, clusterPhotosData, totalHistoryCount]);

  const selectedAlbumTitle = albumDetail?.title;

  const handlePinClick = (pin: MapPin) => {
    if (pin.isCluster) {
      // 같은 클러스터 Detail을 이미 보고 있는 경우 슬라이드 뷰로 전환
      if (
        sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL &&
        sheetContext.clusterId === pin.clusterId
      ) {
        const firstPhotoId = clusterPhotosData?.[0]?.id;
        if (firstPhotoId) {
          router.push(ROUTES.PHOTO.VIEW_WITH_CLUSTER(firstPhotoId, pin.clusterId));
        }
        return;
      }

      // 새로운 클러스터 Detail 열기
      setSheetContext({
        type: SHEET_CONTEXT_TYPE.CLUSTER_DETAIL,
        clusterId: pin.clusterId!,
        latitude: pin.latitude,
        longitude: pin.longitude,
      });
    } else {
      router.push(ROUTES.PHOTO.VIEW(pin.id));
    }
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

  const handleCloseClusterDetail = () => {
    setSheetContext({ type: SHEET_CONTEXT_TYPE.HOME });
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
          clusterLocationData={clusterLocationData}
          address={address}
          onCloseAlbumDetail={handleCloseAlbumDetail}
          onOpenAlbumRename={handleOpenAlbumRename}
          onOpenAlbumDelete={handleOpenAlbumDelete}
          onCloseClusterDetail={handleCloseClusterDetail}
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
        albumList={albumList}
        albumDetailById={albumDetailById}
        photoCount={photoCount}
        onChangeContext={setSheetContext}
        onSelectAlbum={handleSelectAlbum}
        onGoToCurrentLocation={handleGoToCurrentLocation}
        onOpenAddAlbumModal={() => setIsAddModalOpen(true)}
      />

      <AlbumAddModalContainer
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <AlbumRenameModalContainer
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        selectedAlbumId={selectedAlbumId ?? undefined}
        initialTitle={selectedAlbumTitle}
      />
      <AlbumDeleteModalContainer
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        selectedAlbumId={selectedAlbumId ?? undefined}
      />
      <LocationPermissionModal
        isOpen={isLocationDeniedModalOpen}
        onClose={handleCloseLocationDeniedModal}
      />
      <LocationPermissionModal
        isOpen={isLocationDeniedModalOpen}
        onClose={handleCloseLocationDeniedModal}
      />
    </S.Wrapper>
  );
}
