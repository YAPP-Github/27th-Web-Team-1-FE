'use client';

import React, { useState, useRef, useEffect } from 'react';
import CheckIcon from '@/assets/images/check.svg';
import CancelIcon from '@/assets/images/cancel.svg';
import CircleButton from '@/components/buttons/circleButton/CircleButton';
import * as S from "./BottomSheet.styles";

const BottomSheet = () => {
  const [height, setHeight] = useState(160);
  const [isDragging, setIsDragging] = useState(false);
  const [maxHeight, setMaxHeight] = useState(800);

  const MIN_HEIGHT = 160;
  const MID_HEIGHT = 394;

  useEffect(() => {
    setMaxHeight(window.innerHeight);
    const handleResize = () => setMaxHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startY = useRef(0);
  const startHeight = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    
    startY.current = e.clientY;
    startHeight.current = height;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.stopPropagation();

    const deltaY = startY.current - e.clientY;
    const newHeight = startHeight.current + deltaY;
    
    if (newHeight >= 0 && newHeight <= maxHeight) {
      setHeight(newHeight);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.stopPropagation();
    setIsDragging(false);
    
    const points = [MIN_HEIGHT, MID_HEIGHT, maxHeight];
    const closest = points.reduce((prev, curr) => {
      return Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev;
    });

    setHeight(closest);
  };

  return (
    <>
      <S.ActionColumn $sheetHeight={height}>
        <CircleButton aria-label="확인" onClick={() => {}}>
          <CheckIcon width={16} height={16} />
        </CircleButton>
        <CircleButton aria-label="취소" onClick={() => {}}>
          <CancelIcon width={14} height={14} />
        </CircleButton>
      </S.ActionColumn>
      <S.SheetWrapper 
        $height={height} 
        $isDragging={isDragging}
        style={{ height: `${height}px` }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <S.HandleBar 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="handle" />
        </S.HandleBar>
        <S.Content>
          {height <= MIN_HEIGHT && <p>Small 모드: 요약 정보</p>}
          {height > MIN_HEIGHT && height <= MID_HEIGHT && <p>Mid 모드: 상세 리스트</p>}
          {height > MID_HEIGHT && <p>Large 모드: 전체 화면 컨텐츠</p>}
        </S.Content>
      </S.SheetWrapper>
    </>
  );
};

export default BottomSheet;
