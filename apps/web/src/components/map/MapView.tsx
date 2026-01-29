'use client';

import { useRef, useCallback } from 'react';
import { Map, GeolocateControl, Marker } from 'react-map-gl/mapbox';
import type { GeolocateControl as GeolocateControlInstance } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationState, MapPin } from '@/types/map.type';
import * as S from './MapView.styels';
import ImagePin from '../image/ImagePin';

interface MapViewProps {
  locationState: LocationState;
  pins: MapPin[];
  selectedAlbumId: number | null;
}

export default function MapView({
  locationState,
  pins,
  selectedAlbumId = null,
}: MapViewProps) {
  const geolocateControlRef = useRef<GeolocateControlInstance>(null);

  const onMapLoad = useCallback(() => {
    if (geolocateControlRef.current) {
      geolocateControlRef.current.trigger();
    }
  }, []);

  const visiblePins =
    selectedAlbumId === null
      ? pins
      : pins.filter((pin) => pin.albumId === selectedAlbumId);

  return (
    <S.Wrapper>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onLoad={onMapLoad}
        initialViewState={{
          latitude: locationState.latitude,
          longitude: locationState.longitude,
          zoom: locationState.zoom,
        }}
        mapStyle="mapbox://styles/hongju/cmkruslij000k01sfb7c48qju"
      >
        <GeolocateControl
          ref={geolocateControlRef}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
          position="bottom-right"
          style={{ display: 'none' }}
        />
        {visiblePins.map((pin) => (
          <Marker
            key={pin.id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            anchor="bottom"
          >
            <ImagePin
              imageUrl={pin.imageUrl}
              imageCount={pin.imageCount}
              onClick={() => console.log(`${pin.id} 클릭됨`)}
            />
          </Marker>
        ))}
      </Map>
    </S.Wrapper>
  );
}
