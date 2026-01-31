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
    let permissionStatus: PermissionStatus | null = null;

    const handleChange = () => {
      if (permissionStatus) {
        setPermissionState(permissionStatus.state as GeolocationPermissionState);
      }
    };

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
        permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        setPermissionState(permissionStatus.state as GeolocationPermissionState);
        permissionStatus.addEventListener('change', handleChange);
      } catch {
        setPermissionState('prompt');
      } finally {
        setIsLoading(false);
      }
    };

    checkPermission();

    return () => {
      if (permissionStatus) {
        permissionStatus.removeEventListener('change', handleChange);
      }
    };
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
