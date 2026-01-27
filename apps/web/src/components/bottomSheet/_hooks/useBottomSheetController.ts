import { useEffect, useState } from 'react';
import { SheetContext } from '../_context/SheetContext';

export function useBottomSheetController(context: SheetContext) {
  const MIN_HEIGHT = 160;
  const MID_HEIGHT = 394;

  const getMaxHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 800);

  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    if (context.type === 'home') {
      setHeight(MIN_HEIGHT);
    }
    if (context.type === 'albumList') {
      setHeight(MID_HEIGHT);
    }
    if (context.type === 'albumDetail') setHeight(MID_HEIGHT);
  }, [context]);

  const clampHeight = (nextHeight: number) => {
    return Math.min(Math.max(nextHeight, MIN_HEIGHT), getMaxHeight());
  };

  const snapHeightOnly = (currentHeight: number) => {
    const MAX_HEIGHT = getMaxHeight();
    const points = [MIN_HEIGHT, MID_HEIGHT, MAX_HEIGHT];
    const closest = points.reduce((prev, curr) =>
      Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev,
    );
    setHeight(closest);
  };

  const deriveContextFromHeight = (height: number): SheetContext => {
    if (height < (MIN_HEIGHT + MID_HEIGHT) / 2) {
      return { type: 'home' };
    }

    return { type: 'albumList' };
  };

  return {
    height,
    setHeight,
    clampHeight,
    snapHeightOnly,
    deriveContextFromHeight,
    MID_HEIGHT,
  };
}
