'use client';
import { ExploreHeader } from '@/components/header';
import MapView from '@/components/map/MapView';
import * as S from './page.styles';
import { useEffect, useState } from 'react';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { LocationState } from '@/types/map.type';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import { SheetContext } from '@/components/bottomSheet/_context/SheetContext';
import { mapMockData } from './mockData';

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

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <ExploreHeader
          title="서울특별시 마포구"
          onClickProfile={() => {}}
          onClickExplore={() => {}}
        />
      </S.HeaderContainer>
      {viewState && <MapView locationState={viewState} pins={mapMockData} />}
      <BottomSheet context={sheetContext} onChangeContext={setSheetContext} />
    </S.Wrapper>
  );
}
