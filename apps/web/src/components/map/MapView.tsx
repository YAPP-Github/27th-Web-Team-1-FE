'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Map, GeolocateControl, Marker } from 'react-map-gl/mapbox';
import type { GeolocateControl as GeolocateControlInstance } from 'mapbox-gl';
import type { MapRef } from 'react-map-gl/mapbox';
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
  flyTo: (options: { longitude: number; latitude: number; zoom: number }) => void;
}

const FLY_TO_DURATION = 1000;

const MapView = forwardRef<MapViewHandle, MapViewProps>(
  ({ locationState, pins, onPinClick, onViewStateChange }, ref) => {
    const geolocateControlRef = useRef<GeolocateControlInstance>(null);
    const mapRef = useRef<MapRef>(null);

    useImperativeHandle(
      ref,
      () => ({
        goToCurrentLocation: () => {
          if (geolocateControlRef.current) {
            geolocateControlRef.current.trigger();
          }
        },
        flyTo: (options) => {
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [options.longitude, options.latitude],
              zoom: options.zoom,
              duration: FLY_TO_DURATION,
            });
          }
        },
      }),
      [],
    );

    return (
      <S.Wrapper>
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          {...locationState}
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
