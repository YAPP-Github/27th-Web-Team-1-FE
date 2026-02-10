'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchPlaces, getSearchPlacesQueryKey } from '@repo/api-client';
import { useDebounce } from '@/hooks/useDebounce';
import { usePhotoContext, type PhotoNoteState } from '@/app/photo/_contexts/PhotoContext';
import { STATE_SOURCE, type StateSource } from '@/app/photo/_constants/stateSource';

const DEBOUNCE_DELAY = 500;

type SelectedLocation = PhotoNoteState['selectedLocation'];

interface UseLocationModalOptions {
  /** 상태 소스: 사진 추가(NOTE) 또는 사진 수정(EDIT) */
  stateSource?: StateSource;
}

const useLocationModal = (options?: UseLocationModalOptions) => {
  const stateSource = options?.stateSource ?? STATE_SOURCE.NOTE;
  const { photoNoteState, updatePhotoNoteState, photoEditState, updatePhotoEditState } =
    usePhotoContext();

  const state = stateSource === STATE_SOURCE.EDIT ? photoEditState : photoNoteState;
  const updateState =
    stateSource === STATE_SOURCE.EDIT ? updatePhotoEditState : updatePhotoNoteState;

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

  const setSelectedLocation = (location: SelectedLocation) => {
    updateState({ selectedLocation: location });
  };

  const openModal = () => {
    setTempSelectedLocationId(
      state.selectedLocation
        ? `${state.selectedLocation.longitude}-${state.selectedLocation.latitude}`
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
    selectedLocation: state.selectedLocation,
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
