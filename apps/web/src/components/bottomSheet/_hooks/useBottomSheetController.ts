import { useEffect, useState } from 'react';
import {
  FLOATING_BUTTON_HEIGHT,
  HEADER_HEIGHT,
  LOW_HEIGHT,
  MID_HEIGHT,
  MIN_HEIGHT,
  SHEET_CONTEXT_TYPE,
  SheetContext,
} from '../constants';

export function useBottomSheetController(context: SheetContext) {
  const getMaxHeight = () => {
    if (typeof window === 'undefined') return 800;

    if (context.type === SHEET_CONTEXT_TYPE.ALBUM_LIST) {
      return window.innerHeight;
    }

    return window.innerHeight - HEADER_HEIGHT - FLOATING_BUTTON_HEIGHT;
  };

  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    if (context.type === SHEET_CONTEXT_TYPE.ALBUM_LIST) {
      setHeight(MID_HEIGHT);
    }
    if (context.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL) setHeight(MID_HEIGHT);
  }, [context]);

  const clampHeight = (nextHeight: number) => {
    return Math.min(Math.max(nextHeight, LOW_HEIGHT), getMaxHeight());
  };

  const snapHeightOnly = (currentHeight: number) => {
    const MAX_HEIGHT = getMaxHeight();
    const points = [LOW_HEIGHT, MIN_HEIGHT, MID_HEIGHT, MAX_HEIGHT];
    const closest = points.reduce((prev, curr) =>
      Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev,
    );
    setHeight(closest);
    return closest;
  };

  const deriveContextFromHeight = (height: number): SheetContext => {
    if (height < (MIN_HEIGHT + MID_HEIGHT) / 2) {
      return { type: SHEET_CONTEXT_TYPE.HOME };
    }

    return { type: SHEET_CONTEXT_TYPE.ALBUM_LIST };
  };

  const isMaxHeight = Math.abs(height - getMaxHeight()) < 10;
  const showFloatingButton =
    isMaxHeight &&
    (context.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ||
      context.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL);
  const showActionButtons = !isMaxHeight;

  return {
    height,
    setHeight,
    clampHeight,
    snapHeightOnly,
    deriveContextFromHeight,
    MID_HEIGHT,
    showFloatingButton,
    showActionButtons,
    isMaxHeight,
  };
}
