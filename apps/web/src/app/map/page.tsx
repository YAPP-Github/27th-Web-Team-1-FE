'use client';
import { ExploreHeader, MenuHeader } from '@/components/header';
import MapView from '@/components/map/MapView';
import * as S from './page.styles';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { LocationState } from '@/types/map.type';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import { SHEET_CONTEXT_TYPE, SheetContext } from '@/components/bottomSheet/constants';
import { DEFAULT_LOCATION, DEFAULT_ZOOM } from './constants';
import { useSelectableAlbums } from '@/hooks/queries/useSelectableAlbums';
import { useAlbumPhotos } from '@/hooks/queries/useAlbumPhotos';
import { useMapPhotos } from '@/hooks/queries/useMapPhotos';
import type { AlbumDetailData } from '@/types/album.type';

const calculateBbox = (viewState: LocationState): string => {
  const offset = 0.05;
  const west = viewState.longitude - offset;
  const south = viewState.latitude - offset;
  const east = viewState.longitude + offset;
  const north = viewState.latitude + offset;
  return `${west},${south},${east},${north}`;
};

export default function MapPage() {
  const [viewState, setViewState] = useState<LocationState | null>(null);
  const [sheetContext, setSheetContext] = useState<SheetContext>({
    type: SHEET_CONTEXT_TYPE.HOME,
  });

  const selectedAlbumId =
    sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ? sheetContext.albumId : null;

  const { albumList } = useSelectableAlbums();
  const { albumDetail } = useAlbumPhotos(selectedAlbumId);
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

  const selectedAlbumTitle = albumDetail?.title;

  const handleSelectAlbum = (albumId: number) => {
    setSheetContext({ type: SHEET_CONTEXT_TYPE.ALBUM_DETAIL, albumId });
  };

  const handleCloseAlbumDetail = () => {
    setSheetContext({ type: SHEET_CONTEXT_TYPE.ALBUM_LIST });
  };

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        {sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ? (
          <MenuHeader
            title={selectedAlbumTitle ?? '앨범'}
            onClickBack={handleCloseAlbumDetail}
          />
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
    </S.Wrapper>
  );
}
