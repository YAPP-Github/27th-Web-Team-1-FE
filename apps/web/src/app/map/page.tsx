'use client';
import { ExploreHeader } from '@/components/header';
import MapView from '@/components/map/MapView';
import * as S from './page.styles';
import { useEffect, useState } from 'react';
import { getCurrentPosition } from '@/utils/getCurrentPosition';
import { LocationState } from '@/types/map.type';
import BottomSheet from '@/components/bottomSheet/BottomSheet';

export default function MapPage() {
  const [viewState, setViewState] = useState<LocationState | null>(null);

  const mockDatas = [
    {
      id: 1,
      latitude: 37.5665,
      longitude: 126.978,
      imageUrl: 'https://picsum.photos/id/10/300/400',
      imageCount: 3,
    },
    {
      id: 2,
      latitude: 37.541,
      longitude: 127.0173,
      imageUrl: 'https://picsum.photos/id/20/300/400',
      imageCount: 1,
    },
    {
      id: 3,
      latitude: 37.5172,
      longitude: 127.0413,
      imageUrl: 'https://picsum.photos/id/30/300/400',
      imageCount: 5,
    },
    {
      id: 4,
      latitude: 37.5035,
      longitude: 127.049,
      imageUrl: 'https://picsum.photos/id/40/300/400',
      imageCount: 2,
    },
    {
      id: 5,
      latitude: 37.5759,
      longitude: 126.9768,
      imageUrl: 'https://picsum.photos/id/50/300/400',
      imageCount: 12,
    },
  ];

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
      {viewState && <MapView locationState={viewState} pins={mockDatas} />}
      <BottomSheet />
    </S.Wrapper>
  );
}
