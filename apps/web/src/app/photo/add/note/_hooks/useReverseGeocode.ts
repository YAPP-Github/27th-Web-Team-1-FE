'use client';

import { skipToken, useQuery } from '@tanstack/react-query';
import {
  getLocationInfo,
  getGetLocationInfoQueryKey,
  GetLocationInfoParams,
} from '@repo/api-client';

export const useReverseGeocode = ({
  latitude,
  longitude,
}: Partial<GetLocationInfoParams>) => {
  const enabled = latitude !== undefined && longitude !== undefined;

  return useQuery({
    queryKey: getGetLocationInfoQueryKey(
      enabled ? { latitude, longitude } : { latitude: 0, longitude: 0 },
    ),
    queryFn: enabled ? () => getLocationInfo({ latitude, longitude }) : skipToken,
  });
};
