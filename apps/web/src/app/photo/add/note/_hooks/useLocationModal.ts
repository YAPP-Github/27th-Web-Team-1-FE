'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchPlaces, getSearchPlacesQueryKey, PlaceResponse } from '@repo/api-client';
import { useDebounce } from '@/hooks/useDebounce';
import { usePhotoContext, type PhotoNoteState } from '@/app/photo/_contexts/PhotoContext';

const DEBOUNCE_DELAY = 500;

type SelectedLocation = PhotoNoteState['selectedLocation'];

interface UseLocationModalOptions {
  /** 로컬 상태 사용 (편집 화면용) */
  useLocalState?: boolean;
}

const useLocationModal = (options?: UseLocationModalOptions) => {
  const useLocalState = options?.useLocalState ?? false;
  const { photoNoteState, updatePhotoNoteState } = usePhotoContext();

  // 로컬 상태 (편집 화면용)
  const [localSelectedLocation, setLocalSelectedLocation] =
    useState<SelectedLocation>(null);

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

  const selectedLocation = useLocalState
    ? localSelectedLocation
    : photoNoteState.selectedLocation;

  const setSelectedLocation = (location: SelectedLocation) => {
    if (useLocalState) {
      setLocalSelectedLocation(location);
    } else {
      updatePhotoNoteState({ selectedLocation: location });
    }
  };

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
        setSelectedLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
          roadAddress: location.roadAddress,
          placeName: location.placeName,
        });
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
