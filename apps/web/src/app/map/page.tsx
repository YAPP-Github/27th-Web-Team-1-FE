'use client';
import { ExploreHeader, MenuHeader } from '@/components/header';
import MapView from '@/components/map/MapView';
import * as S from './page.styles';
import { useEffect, useState } from 'react';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { LocationState } from '@/types/map.type';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import { SheetContext } from '@/components/bottomSheet/_context/SheetContext';
import { albumDetailById, albumList, mapPins } from './mockData';

export default function MapPage() {
  const [viewState, setViewState] = useState<LocationState | null>(null);
  const [sheetContext, setSheetContext] = useState<SheetContext>({
    type: 'home',
  });

  useEffect(() => {
    const init = async () => {
      try {
        const pos = await getCurrentPosition();

        setViewState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          zoom: 14,
        });
      } catch (err) {
        console.log(err);
        setViewState({
          latitude: 37.5665,
          longitude: 126.978,
          zoom: 12,
        });
      }
    };

    init();
  }, []);

  const selectedAlbumId =
    sheetContext.type === 'albumDetail' ? sheetContext.albumId : null;
  const selectedAlbumTitle =
    selectedAlbumId !== null ? albumDetailById[selectedAlbumId]?.title : undefined;

  const handleSelectAlbum = (albumId: number) => {
    setSheetContext({ type: 'albumDetail', albumId });
  };

  const handleCloseAlbumDetail = () => {
    setSheetContext({ type: 'albumList' });
  };

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        {sheetContext.type === 'albumDetail' ? (
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
