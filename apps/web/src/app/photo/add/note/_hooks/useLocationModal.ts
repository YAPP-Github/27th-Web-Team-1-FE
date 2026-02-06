'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchPlaces, getSearchPlacesQueryKey, PlaceResponse } from '@repo/api-client';
import { useDebounce } from '@/hooks/useDebounce';

const DEBOUNCE_DELAY = 500;

interface UseLocationModalOptions {
  initialLocation?: Pick<PlaceResponse, 'latitude' | 'longitude' | 'address'> | null;
}

const useLocationModal = (options?: UseLocationModalOptions) => {
  const initialLocationState: PlaceResponse | null = options?.initialLocation
    ? {
        latitude: options.initialLocation.latitude,
        longitude: options.initialLocation.longitude,
        address: options.initialLocation.address,
      }
    : null;

  const [selectedLocation, setSelectedLocation] = useState<PlaceResponse | null>(
    initialLocationState,
  );
  const [tempSelectedLocationId, setTempSelectedLocationId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const { data, isLoading } = useQuery({
    queryKey: getSearchPlacesQueryKey({ query: debouncedQuery }),
    queryFn: () => searchPlaces({ query: debouncedQuery }),
    enabled: isOpen && debouncedQuery.length > 0,
  });

  const locations = data?.places ?? [];

  const openModal = () => {
    setTempSelectedLocationId(
      selectedLocation
        ? `${selectedLocation.longitude}-${selectedLocation.latitude}`
        : null,
    );
    setSearchQuery('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitLocation = () => {
    if (tempSelectedLocationId && locations.length > 0) {
      const location = locations.find(
        (l) => `${l.longitude}-${l.latitude}` === tempSelectedLocationId,
      );
      if (location) {
        setSelectedLocation(location);
      }
    }
    closeModal();
  };

  return {
    selectedLocation,
    setSelectedLocation,
    tempSelectedLocationId,
    setTempSelectedLocationId,
    searchQuery,
    setSearchQuery,
    locations,
    isLoading,
    isOpen,
    openModal,
    closeModal,
    submitLocation,
  };
};

export default useLocationModal;
