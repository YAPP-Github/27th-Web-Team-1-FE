'use client';
import { ExploreHeader, MenuHeader } from '@/components/header';
import MapView from '@/components/map/MapView';
import * as S from './page.styles';
import { useEffect, useState } from 'react';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { LocationState } from '@/types/map.type';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import {
  SHEET_CONTEXT_TYPE,
  SheetContext,
} from '@/components/bottomSheet/constants';
import { albumDetailById, albumList, mapPins } from './mockData';
import { DEFAULT_LOCATION, DEFAULT_ZOOM } from './constants';

export default function MapPage() {
  const [viewState, setViewState] = useState<LocationState | null>(null);
  const [sheetContext, setSheetContext] = useState<SheetContext>({
    type: SHEET_CONTEXT_TYPE.HOME,
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

  const selectedAlbumId =
    sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ? sheetContext.albumId : null;
  const selectedAlbumTitle =
    selectedAlbumId !== null ? albumDetailById[selectedAlbumId]?.title : undefined;

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
