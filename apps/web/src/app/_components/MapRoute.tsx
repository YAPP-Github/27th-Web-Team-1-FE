'use client';
import { ExploreHeader, MenuHeader } from '@/components/header';
import MapView from '@/components/map/MapView';
import * as S from '../page.styles';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { LocationState } from '@/types/map.type';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import { SHEET_CONTEXT_TYPE, SheetContext } from '@/components/bottomSheet/constants';
import { DEFAULT_LOCATION, DEFAULT_ZOOM } from '../constants';
import { useSelectableAlbums } from '@/hooks/queries/useSelectableAlbums';
import { useAlbumPhotos } from '@/hooks/queries/useAlbumPhotos';
import { useMapPhotos } from '@/hooks/queries/useMapPhotos';
import { useGetAlbumMapInfo } from '@repo/api-client';
import type { AlbumDetailData } from '@/types/album.type';
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

  const { albumList } = useSelectableAlbums();
  const { albumDetail } = useAlbumPhotos(selectedAlbumId);
  const { data: albumMapInfo } = useGetAlbumMapInfo(selectedAlbumId ?? 0);
  const { mapPins } = useMapPhotos({
    zoom: viewState?.zoom ?? DEFAULT_ZOOM,
    bbox: viewState ? calculateBbox(viewState) : '',
    albumId: selectedAlbumId,
  });

  const albumDetailById = useMemo<Record<number, AlbumDetailData>>(() => {
    if (!albumDetail) return {};
    return { [albumDetail.id]: albumDetail };
  }, [albumDetail]);

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

  useEffect(() => {
    if (
      albumMapInfo?.centerLongitude !== undefined &&
      albumMapInfo?.centerLatitude !== undefined
    ) {
      setViewState((prev) => ({
        longitude: albumMapInfo.centerLongitude!,
        latitude: albumMapInfo.centerLatitude!,
        zoom: prev?.zoom ?? DEFAULT_ZOOM,
      }));
    }
  }, [albumMapInfo?.centerLongitude, albumMapInfo?.centerLatitude]);

  const selectedAlbumTitle = albumDetail?.title;

  const handleSelectAlbum = (albumId: number) => {
    setSheetContext({ type: SHEET_CONTEXT_TYPE.ALBUM_DETAIL, albumId });
    router.push(`/album/${albumId}`);
  };

  const handleCloseAlbumDetail = () => {
    router.back();
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
        ) : (
          <ExploreHeader
            title="서울특별시 마포구"
            onClickProfile={() => {}}
            onClickExplore={() => {}}
          />
        )}
      </S.HeaderContainer>
      {viewState && (
        <MapView
          locationState={viewState}
          pins={mapPins}
          selectedAlbumId={selectedAlbumId}
        />
      )}
      <BottomSheet
        context={sheetContext}
        albums={albumList}
        albumDetailById={albumDetailById}
        onChangeContext={setSheetContext}
        onSelectAlbum={handleSelectAlbum}
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
    </S.Wrapper>
  );
}
