'use client';

import { useQuery } from '@tanstack/react-query';
import { buildUrlWithQueryParams } from '@repo/api-client';
import { API_URL } from '@/constants';

interface AddressResponse {
  address: string;
  placeName: string;
}

const fetchAddress = async (
  latitude: number,
  longitude: number
): Promise<AddressResponse> => {
  const url = buildUrlWithQueryParams(`/api${API_URL.LOCATION.ADDRESS}`, {
    latitude,
    longitude,
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  return response.json();
};

interface UseReverseGeocodeParams {
  latitude?: number;
  longitude?: number;
}

export const useReverseGeocode = ({ latitude, longitude }: UseReverseGeocodeParams) => {
  const queryKey = buildUrlWithQueryParams(API_URL.LOCATION.ADDRESS, {
    latitude,
    longitude,
  });

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchAddress(latitude!, longitude!),
    enabled: latitude !== undefined && longitude !== undefined,
  });
};
