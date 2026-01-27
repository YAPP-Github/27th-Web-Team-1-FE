import { useCallback, useRef, useState } from 'react';

const LONG_PRESS_DURATION = 1500;

const useLongPress = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLongPressStart = useCallback(() => {
    longPressTimerRef.current = setTimeout(() => {
      setIsOverlayVisible(false);
    }, LONG_PRESS_DURATION);
  }, []);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    longPressTimerRef.current = setTimeout(() => {
      setIsOverlayVisible(true);
    }, LONG_PRESS_DURATION);
  }, []);

  return {
    isOverlayVisible,
    longPressHandlers: {
      onMouseDown: handleLongPressStart,
      onMouseUp: handleLongPressEnd,
      onMouseLeave: handleLongPressEnd,
      onTouchStart: handleLongPressStart,
      onTouchEnd: handleLongPressEnd,
    },
  };
};

export default useLongPress;
