'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
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
import { AlbumAddModalContainer, type AlbumAddModalContainerHandle } from './albumAddModal/AlbumAddModalContainer';
import { AlbumRenameModalContainer, type AlbumRenameModalContainerHandle } from './albumRenameModal/AlbumRenameModalContainer';
import { AlbumDeleteModalContainer, type AlbumDeleteModalContainerHandle } from './albumDeleteModal/AlbumDeleteModalContainer';

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
    clusterLocationData,
    clusterPhotosData,
  } = useMapRouteData({
    viewState,
    sheetContext,
    selectedAlbumId,
  });

  // 모달 ref
  const albumAddModalRef = useRef<AlbumAddModalContainerHandle>(null);
  const albumRenameModalRef = useRef<AlbumRenameModalContainerHandle>(null);
  const albumDeleteModalRef = useRef<AlbumDeleteModalContainerHandle>(null);

  // 앨범이 선택되었을 때 앨범의 중심 위치로 지도 이동
  useEffect(() => {
    if (
      viewState &&
      selectedAlbumId &&
      albumMapInfo?.centerLongitude &&
      albumMapInfo?.centerLatitude
    ) {
      handleViewStateChange({
        longitude: albumMapInfo.centerLongitude,
        latitude: albumMapInfo.centerLatitude,
        zoom: viewState.zoom ?? DEFAULT_ZOOM,
      });
    }
  }, [selectedAlbumId, albumMapInfo, viewState, handleViewStateChange]);

  // 계산된 데이터
  const albumDetailById = useMemo(() => {
    if (!albumDetail?.id) return {};
    return { [albumDetail.id]: albumDetail };
  }, [albumDetail]);

  const photoCount = useMemo(() => {
    const clusterPhotoCount = clusterPhotosData?.totalElements ?? 0;
    return calculatePhotoCount(
      sheetContext,
      albumDetail,
      clusterPhotoCount,
      mapPins.length,
    );
  }, [sheetContext, albumDetail, clusterPhotosData, mapPins.length]);

  const selectedAlbumTitle = albumDetail?.title;

  const handlePinClick = (pin: MapPin) => {
    if (pin.isCluster) {
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
    albumRenameModalRef.current?.open(selectedAlbumTitle ?? '');
  };

  const handleOpenAlbumDelete = () => {
    albumDeleteModalRef.current?.open();
  };

  const handleCloseClusterDetail = () => {
    setSheetContext({ type: SHEET_CONTEXT_TYPE.HOME });
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
        onOpenAddAlbumModal={() => albumAddModalRef.current?.open()}
      />

      <AlbumAddModalContainer ref={albumAddModalRef} />
      <AlbumRenameModalContainer ref={albumRenameModalRef} selectedAlbumId={selectedAlbumId ?? undefined} />
      <AlbumDeleteModalContainer ref={albumDeleteModalRef} selectedAlbumId={selectedAlbumId ?? undefined} />
    </S.Wrapper>
  );
}
