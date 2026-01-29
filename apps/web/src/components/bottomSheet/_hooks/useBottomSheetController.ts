import { useEffect, useState } from 'react';
import { MID_HEIGHT, MIN_HEIGHT, SHEET_CONTEXT_TYPE, SheetContext } from '../constants';

export function useBottomSheetController(context: SheetContext) {
  const getMaxHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 800);

  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    if (context.type === SHEET_CONTEXT_TYPE.HOME) {
      setHeight(MIN_HEIGHT);
    }
    if (context.type === SHEET_CONTEXT_TYPE.ALBUM_LIST) {
      setHeight(MID_HEIGHT);
    }
    if (context.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL) setHeight(MID_HEIGHT);
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
      return { type: SHEET_CONTEXT_TYPE.HOME };
    }

    return { type: SHEET_CONTEXT_TYPE.ALBUM_LIST };
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
