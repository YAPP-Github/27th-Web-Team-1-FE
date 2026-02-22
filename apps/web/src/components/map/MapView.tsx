'use client';

import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Map, GeolocateControl, Marker } from 'react-map-gl/mapbox';
import type { GeolocateControl as GeolocateControlInstance } from 'mapbox-gl';
import type { MapRef } from 'react-map-gl/mapbox';
import { AnimatePresence } from 'framer-motion';
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
    const isProgrammaticMoveRef = useRef(false);

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
            isProgrammaticMoveRef.current = true;
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

    useEffect(() => {
      if (locationState && mapRef.current) {
        isProgrammaticMoveRef.current = true;
        mapRef.current.flyTo({
          center: [locationState.longitude, locationState.latitude],
          zoom: locationState.zoom,
          duration: FLY_TO_DURATION,
        });
      }
    }, [locationState]);

    return (
      <S.Wrapper>
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            latitude: locationState.latitude,
            longitude: locationState.longitude,
            zoom: locationState.zoom,
          }}
          maxBounds={[
            [123, 20],
            [133, 43],
          ]}
          maxPitch={0}
          onMove={(evt) => {
            if (!isProgrammaticMoveRef.current && onViewStateChange) {
              onViewStateChange({
                latitude: evt.viewState.latitude,
                longitude: evt.viewState.longitude,
                zoom: evt.viewState.zoom,
              });
            }
          }}
          onMoveEnd={() => {
            isProgrammaticMoveRef.current = false;
          }}
          mapStyle="mapbox://styles/lokit1220/cmlw1c5hh004w01sqblp751wd"
        >
          <GeolocateControl
            ref={geolocateControlRef}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
            position="bottom-right"
            style={{ display: 'none' }}
          />
          <AnimatePresence mode="sync">
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
          </AnimatePresence>
        </Map>
      </S.Wrapper>
    );
  },
);

// 디버깅을 위한 용도
MapView.displayName = 'MapView';

export default React.memo(MapView);
