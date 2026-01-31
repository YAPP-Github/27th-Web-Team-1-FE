'use client';

import { useCallback, useEffect, useState } from 'react';

const GEOLOCATION_TIMEOUT = 10_000;

export type GeolocationPermissionState = 'prompt' | 'granted' | 'denied' | 'unsupported';

interface UseGeolocationPermissionReturn {
  permissionState: GeolocationPermissionState;
  isLoading: boolean;
  requestPermission: () => Promise<GeolocationPosition | null>;
}

export const useGeolocationPermission = (): UseGeolocationPermissionReturn => {
  const [permissionState, setPermissionState] =
    useState<GeolocationPermissionState>('prompt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      if (!navigator.geolocation) {
        setPermissionState('unsupported');
        setIsLoading(false);
        return;
      }

      if (!navigator.permissions) {
        setPermissionState('prompt');
        setIsLoading(false);
        return;
      }

      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setPermissionState(result.state as GeolocationPermissionState);

        result.addEventListener('change', () => {
          setPermissionState(result.state as GeolocationPermissionState);
        });
      } catch {
        setPermissionState('prompt');
      } finally {
        setIsLoading(false);
      }
    };

    checkPermission();
  }, []);

  const requestPermission = useCallback(async (): Promise<GeolocationPosition | null> => {
    if (!navigator.geolocation) {
      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionState('granted');
          resolve(position);
        },
        () => {
          setPermissionState('denied');
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: GEOLOCATION_TIMEOUT,
        },
      );
    });
  }, []);

  return {
    permissionState,
    isLoading,
    requestPermission,
  };
};
