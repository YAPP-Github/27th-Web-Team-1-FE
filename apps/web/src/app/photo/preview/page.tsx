'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MapPreview from '@/components/map/MapPreview';

interface MapPreviewState {
  latitude: number;
  longitude: number;
  photoUrl: string;
}

export default function PhotoPreviewPage() {
  const router = useRouter();
  const [state, setState] = useState<MapPreviewState | null>(null);

  useEffect(() => {
    const savedState = sessionStorage.getItem('mapPreviewState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState) as MapPreviewState;
        if (parsedState?.latitude && parsedState?.longitude) {
          setState(parsedState);
          // 사용 후 삭제
          sessionStorage.removeItem('mapPreviewState');
        }
      } catch (error) {
        console.error('Failed to parse mapPreviewState:', error);
      }
    }
  }, []);

  const handleClose = () => {
    router.back();
  };

  if (!state) {
    return null;
  }

  return (
    <MapPreview
      latitude={state.latitude}
      longitude={state.longitude}
      photoUrl={state.photoUrl}
      onClose={handleClose}
    />
  );
}
