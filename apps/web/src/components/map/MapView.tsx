'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Map, GeolocateControl, Marker } from 'react-map-gl/mapbox';
import type { GeolocateControl as GeolocateControlInstance } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationState, MapPin } from '@/types/map.type';
import * as S from './MapView.styels';
import ImagePin from '../image/ImagePin';

interface MapViewProps {
  locationState: LocationState;
  pins: MapPin[];
  onPinClick: (pin: MapPin) => void;
  onViewStateChange?: (viewState: LocationState) => void;
}

export interface MapViewHandle {
  goToCurrentLocation: () => void;
}

const MapView = forwardRef<MapViewHandle, MapViewProps>(
  ({ locationState, pins, onPinClick, onViewStateChange }, ref) => {
    const geolocateControlRef = useRef<GeolocateControlInstance>(null);

    useImperativeHandle(
      ref,
      () => ({
        goToCurrentLocation: () => {
          if (geolocateControlRef.current) {
            geolocateControlRef.current.trigger();
          }
        },
      }),
      [],
    );

    return (
      <S.Wrapper>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            latitude: locationState.latitude,
            longitude: locationState.longitude,
            zoom: locationState.zoom,
          }}
          onMove={(evt) => {
            if (onViewStateChange) {
              onViewStateChange({
                latitude: evt.viewState.latitude,
                longitude: evt.viewState.longitude,
                zoom: evt.viewState.zoom,
              });
            }
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
          {pins.map((pin) => (
            <Marker
              key={pin.isCluster ? pin.clusterId : pin.id}
              latitude={pin.latitude}
              longitude={pin.longitude}
              anchor="bottom"
            >
              <ImagePin
                imageUrl={pin.imageUrl}
                imageCount={pin.imageCount}
                onClick={() => onPinClick(pin)}
              />
            </Marker>
          ))}
        </Map>
      </S.Wrapper>
    );
  },
);

// 디버깅을 위한 용도
MapView.displayName = 'MapView';

export default MapView;
