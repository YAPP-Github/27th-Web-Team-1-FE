'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import type { MapViewHandle } from '@/components/map/MapView';
import { LocationState } from '@/types/map.type';
import { DEFAULT_LOCATION } from '../constants';

interface UseMapRouteViewStateReturn {
  viewState: LocationState | null;
  mapViewRef: React.RefObject<MapViewHandle | null>;
  handleViewStateChange: (newViewState: LocationState) => void;
  handleGoToCurrentLocation: () => void;
}

/**
 * 지도 뷰 상태를 관리하는 커스텀 훅
 * - 사용자의 현재 위치로 초기화
 * - 뷰 상태 변경 시 debounce 적용 (API 호출 빈도 제한)
 */
export const useMapRouteViewState = (): UseMapRouteViewStateReturn => {
  const [viewState, setViewState] = useState<LocationState | null>(DEFAULT_LOCATION);
  const mapViewRef = useRef<MapViewHandle>(null);
  const viewStateChangeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 지도 이동 시 debounce 적용 (500ms)으로 API 호출 빈도 제한
  const handleViewStateChange = useCallback((newViewState: LocationState) => {
    // 기존 타이머 취소
    if (viewStateChangeTimerRef.current) {
      clearTimeout(viewStateChangeTimerRef.current);
    }

    // 새로운 타이머 설정 (500ms 후에 viewState 업데이트)
    viewStateChangeTimerRef.current = setTimeout(() => {
      setViewState((prevState) => {
        // 값이 실제로 변경된 경우에만 업데이트
        if (
          !prevState ||
          prevState.longitude !== newViewState.longitude ||
          prevState.latitude !== newViewState.latitude ||
          prevState.zoom !== newViewState.zoom
        ) {
          return newViewState;
        }
        return prevState;
      });
    }, 500);
  }, []);

  // 현재 위치로 이동
  const handleGoToCurrentLocation = useCallback(() => {
    mapViewRef.current?.goToCurrentLocation();
  }, []);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (viewStateChangeTimerRef.current) {
        clearTimeout(viewStateChangeTimerRef.current);
      }
    };
  }, []);

  return {
    viewState,
    mapViewRef,
    handleViewStateChange,
    handleGoToCurrentLocation,
  };
};
