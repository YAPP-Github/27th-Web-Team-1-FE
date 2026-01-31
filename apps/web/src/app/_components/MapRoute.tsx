'use client';
import { ExploreHeader, MenuHeader } from '@/components/header';
import MapView, { type MapViewHandle } from '@/components/map/MapView';
import FloatingButton from '@/components/buttons/floatingButton/FloatingButton';
import * as S from '../page.styles';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { LocationState, MapPin } from '@/types/map.type';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import { ROUTES } from '@/constants/routes';
import { SHEET_CONTEXT_TYPE, SheetContext } from '@/components/bottomSheet/constants';
import { DEFAULT_LOCATION, DEFAULT_ZOOM } from '../constants';
import { useMapHomeAlbums } from '@/hooks/queries/useMapHomeAlbums';
import { useAlbumPhotos } from '@/hooks/queries/useAlbumPhotos';
import { useMapPhotos } from '@/hooks/queries/useMapPhotos';
import {
  useGetAlbumMapInfo,
  useGetClusterPhotos,
  customFetcher,
  type AlbumWithPhotosResponse,
  type LocationInfoResponse,
} from '@repo/api-client';
import AlbumRenameModal from './albumRenameModal/AlbumRenameModal';
import useDeleteAlbum from '../_hooks/useDeleteAlbum';
import useAlbumRename from '../_hooks/useAlbumRename';
import AlbumDeleteModal from './albumDeleteModal/AlbumDeleteModal';

const calculateBbox = (viewState: LocationState): string => {
  const offset = 0.05;
  const west = viewState.longitude - offset;
  const south = viewState.latitude - offset;
  const east = viewState.longitude + offset;
  const north = viewState.latitude + offset;
  return `${west},${south},${east},${north}`;
};

export default function MapRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const [viewState, setViewState] = useState<LocationState | null>(null);
  const [sheetContext, setSheetContext] = useState<SheetContext>({
    type: SHEET_CONTEXT_TYPE.HOME,
  });
  const mapViewRef = useRef<MapViewHandle>(null);
  const {
    isModalOpen: isAlbumDeleteOpen,
    isDeleting: isAlbumDeleting,
    openDeleteModal: openAlbumDeleteModal,
    closeDeleteModal: closeAlbumDeleteModal,
    confirmDelete: confirmAlbumDelete,
  } = useDeleteAlbum();
  const {
    isModalOpen: isAlbumRenameOpen,
    isUpdating: isAlbumRenaming,
    albumName,
    setAlbumName,
    openRenameModal: openAlbumRenameModal,
    closeRenameModal: closeAlbumRenameModal,
    confirmRename: confirmAlbumRename,
  } = useAlbumRename();

  const albumIdFromPath = useMemo(() => {
    const match = pathname.match(/^\/album\/(\d+)/);
    if (!match) return null;
    const parsedId = Number(match[1]);
    return Number.isNaN(parsedId) ? null : parsedId;
  }, [pathname]);

  const selectedAlbumId =
    albumIdFromPath ??
    (sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ? sheetContext.albumId : null);

  const { albumList, address } = useMapHomeAlbums({
    longitude: viewState?.longitude,
    latitude: viewState?.latitude,
  });
  const { albumDetail } = useAlbumPhotos(selectedAlbumId);
  const { data: albumMapInfo } = useGetAlbumMapInfo(selectedAlbumId ?? 0);
  const { mapPins } = useMapPhotos({
    zoom: viewState?.zoom ?? DEFAULT_ZOOM,
    bbox: viewState ? calculateBbox(viewState) : '',
    albumId: selectedAlbumId,
  });

  const albumDetailById = useMemo<Record<number, AlbumWithPhotosResponse>>(() => {
    if (!albumDetail?.id) return {};
    return { [albumDetail.id]: albumDetail };
  }, [albumDetail]);

  // 클러스터 위치의 주소 조회
  const clusterLatitude =
    sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL
      ? sheetContext.latitude
      : null;
  const clusterLongitude =
    sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL
      ? sheetContext.longitude
      : null;

  const { data: clusterLocationData } = useQuery({
    queryKey: ['clusterLocation', clusterLatitude, clusterLongitude],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      customFetcher<LocationInfoResponse>({
        url: '/map/location',
        method: 'GET',
        params: { longitude: clusterLongitude!, latitude: clusterLatitude! },
        signal,
      }),
    enabled: !!clusterLatitude && !!clusterLongitude,
  });

  const clusterId =
    sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL
      ? sheetContext.clusterId
      : null;
  const { data: clusterPhotosData } = useGetClusterPhotos(clusterId ?? '', {
    page: 0,
    size: 1,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const pos = await getCurrentPosition();

        setViewState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          zoom: DEFAULT_ZOOM,
        });
      } catch (err) {
        console.log(err);
        setViewState(DEFAULT_LOCATION);
      }
    };

    init();
  }, []);

  // 앨범이 선택되었을 때 앨범의 centerLongitude, centerLatitude로 이동
  useEffect(() => {
    if (
      selectedAlbumId &&
      albumMapInfo?.centerLongitude &&
      albumMapInfo?.centerLatitude
    ) {
      setViewState((prev) => ({
        longitude: albumMapInfo.centerLongitude!,
        latitude: albumMapInfo.centerLatitude!,
        zoom: prev?.zoom ?? DEFAULT_ZOOM,
      }));
    }
  }, [selectedAlbumId, albumMapInfo]);

  useEffect(() => {
    if (albumIdFromPath) {
      setSheetContext({
        type: SHEET_CONTEXT_TYPE.ALBUM_DETAIL,
        albumId: albumIdFromPath,
      });
      return;
    }

    setSheetContext({ type: SHEET_CONTEXT_TYPE.HOME });
  }, [albumIdFromPath]);

  const selectedAlbumTitle = albumDetail?.title;

  // 지도 이동시 debounce (500ms)를 적용하여 API 호출 빈도 제한
  const viewStateChangeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleViewStateChange = useCallback((newViewState: LocationState) => {
    // 기존 타이머 취소
    if (viewStateChangeTimerRef.current) {
      clearTimeout(viewStateChangeTimerRef.current);
    }

    // 새로운 타이머 설정 (500ms 후에 viewState 업데이트)
    viewStateChangeTimerRef.current = setTimeout(() => {
      setViewState(newViewState);
    }, 500);
  }, []);

  // 컴포넌트 언마운트시 타이머 정리
  useEffect(() => {
    return () => {
      if (viewStateChangeTimerRef.current) {
        clearTimeout(viewStateChangeTimerRef.current);
      }
    };
  }, []);

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

  const handleGoToCurrentLocation = () => {
    mapViewRef.current?.goToCurrentLocation();
  };

  const handleOpenAlbumRename = () => {
    openAlbumRenameModal(selectedAlbumTitle ?? '');
  };

  const handleConfirmAlbumRename = () => {
    if (!selectedAlbumId) return;
    confirmAlbumRename(selectedAlbumId);
  };

  const handleConfirmAlbumDelete = () => {
    if (!selectedAlbumId) return;
    confirmAlbumDelete(selectedAlbumId);
  };

  // 사진 개수 계산
  const photoCount = useMemo(() => {
    if (sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL) {
      return albumDetail?.photoCount ?? 0;
    }
    if (sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL) {
      return clusterPhotosData?.totalElements ?? 0;
    }
    return mapPins.length;
  }, [
    sheetContext,
    albumDetail?.photoCount,
    clusterPhotosData?.totalElements,
    mapPins.length,
  ]);

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        {sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ? (
          <MenuHeader
            title={selectedAlbumTitle ?? '앨범'}
            onClickBack={handleCloseAlbumDetail}
          >
            <MenuHeader.Menu>
              <MenuHeader.Item onClick={handleOpenAlbumRename}>
                앨범 이름 변경
              </MenuHeader.Item>
              <MenuHeader.Item variant="danger" onClick={openAlbumDeleteModal}>
                앨범 삭제
              </MenuHeader.Item>
            </MenuHeader.Menu>
          </MenuHeader>
        ) : sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL ? (
          <MenuHeader
            title={clusterLocationData?.address ?? '위치 로딩 중...'}
            onClickBack={() => setSheetContext({ type: SHEET_CONTEXT_TYPE.HOME })}
            showMenu={false}
          />
        ) : (
          <ExploreHeader
            title={address || '위치 정보 로딩 중'}
            onClickProfile={() => {}}
            onClickExplore={() => {}}
          />
        )}
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
      <BottomSheet
        context={sheetContext}
        albums={albumList}
        albumDetailById={albumDetailById}
        onChangeContext={setSheetContext}
        onSelectAlbum={handleSelectAlbum}
        onGoToCurrentLocation={handleGoToCurrentLocation}
      />
      <AlbumDeleteModal
        isOpen={isAlbumDeleteOpen}
        isDeleting={isAlbumDeleting}
        onClose={closeAlbumDeleteModal}
        onConfirm={handleConfirmAlbumDelete}
      />
      <AlbumRenameModal
        isOpen={isAlbumRenameOpen}
        isUpdating={isAlbumRenaming}
        albumName={albumName}
        onChangeAlbumName={setAlbumName}
        onClose={closeAlbumRenameModal}
        onConfirm={handleConfirmAlbumRename}
      />

      <S.FloatingButtonWrapper>
        <FloatingButton text={`기록 ${photoCount}개`} />
      </S.FloatingButtonWrapper>
    </S.Wrapper>
  );
}
