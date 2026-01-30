'use client';

import { useState } from 'react';
import MapView from './MapView';
import BottomSheet from '../bottomSheet/BottomSheet';
import MenuHeader from '../header/menu/MenuHeader';
import { LocationState, MapPin } from '@/types/map.type';
import { SHEET_CONTEXT_TYPE, SheetContext } from '../bottomSheet/constants';
import * as S from './MapPreview.styles';

const DEFAULT_ZOOM = 17;

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  photoUrl: string;
  onClose: () => void;
}

export default function MapPreview({
  latitude,
  longitude,
  photoUrl,
  onClose,
}: MapPreviewProps) {
  const [context, setContext] = useState<SheetContext>({
    type: SHEET_CONTEXT_TYPE.HOME,
  });

  // 사진 위치를 지도 핀으로 변환
  const mapPin: MapPin = {
    id: 1,
    albumId: 0,
    latitude,
    longitude,
    imageUrl: photoUrl,
    imageCount: 1,
  };

  const locationState: LocationState = {
    latitude,
    longitude,
    zoom: DEFAULT_ZOOM,
  };

  return (
    <S.Container>
      <MenuHeader title="지도뷰 미리보기" onClickBack={onClose}>
        <MenuHeader.Menu>
          <MenuHeader.Item>공유</MenuHeader.Item>
          <MenuHeader.Item>저장</MenuHeader.Item>
        </MenuHeader.Menu>
      </MenuHeader>

      <S.MapContainer>
        <MapView locationState={locationState} pins={[mapPin]} selectedAlbumId={null} />
      </S.MapContainer>

      <BottomSheet
        context={context}
        albums={[{ id: 1, title: '전체보기', photoList: [], photoCount: 0 }]}
        albumDetailById={{}}
        onChangeContext={setContext}
        onSelectAlbum={() => {}}
      />
    </S.Container>
  );
}
