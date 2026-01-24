'use client';

import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationState } from '@/types/map.type';
import * as S from './MapView.styels';

interface MapViewProps {
  locationState: LocationState;
}

export default function MapView({ locationState }: MapViewProps) {
  return (
    <S.Wrapper>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          latitude: locationState.latitude,
          longitude: locationState.longitude,
          zoom: locationState.zoom,
        }}
        mapStyle="mapbox://styles/hongju/cmkruslij000k01sfb7c48qju"
      />
    </S.Wrapper>
  );
}
