'use client';

import React, { useState, useRef } from 'react';
import AddIcon from '@/assets/images/add.svg';
import CrossHairIcon from '@/assets/images/crossHair.svg';
import CircleButton from '@/components/buttons/circleButton/CircleButton';
import * as S from './BottomSheet.styles';
import MenuButton from '../buttons/menuButton/MenuButton';
import TextButton from '../buttons/textButton/TextButton';
import { SHEET_CONTEXT_TYPE, SheetContext } from './constants';
import { useBottomSheetController } from './_hooks/useBottomSheetController';
import BottomSheetContent from './bottomSheetContent/BottomSheetContent';
import type { Album, AlbumDetailData } from '@/types/album.type';

interface BottomSheetProps {
  context: SheetContext;
  albums: Album[];
  albumDetailById: Record<number, AlbumDetailData>;
  onChangeContext: (context: SheetContext) => void;
  onSelectAlbum: (albumId: number) => void;
}

const BottomSheet = ({
  context,
  albums,
  albumDetailById,
  onChangeContext,
  onSelectAlbum,
}: BottomSheetProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const {
    height,
    setHeight,
    clampHeight,
    snapHeightOnly,
    deriveContextFromHeight,
    MID_HEIGHT,
  } = useBottomSheetController(context);

  const startY = useRef(0);
  const startHeight = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);

    startY.current = e.clientY;
    startHeight.current = height;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.stopPropagation();

    const deltaY = startY.current - e.clientY;
    const nextHeight = clampHeight(startHeight.current + deltaY);
    setHeight(nextHeight);
  };

  const handlePointerUp = () => {
    setIsDragging(false);

    if (context.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL) {
      snapHeightOnly(height);
      return;
    }

    if (height > MID_HEIGHT && context.type === SHEET_CONTEXT_TYPE.ALBUM_LIST) {
      snapHeightOnly(height);
      return;
    }

    onChangeContext(deriveContextFromHeight(height));
  };

  return (
    <>
      <S.ActionColumn $sheetHeight={height}>
        <MenuButton
          triggerIcon={(isOpen) => (
            <AddIcon
              style={{
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
          )}
          placement="top"
        >
          <TextButton text="사진 추가" onClick={() => {}} />
          <TextButton text="사진 추가" onClick={() => {}} />
          <TextButton text="앨범 추가" onClick={() => {}} />
        </MenuButton>

        <CircleButton aria-label="취소" onClick={() => {}}>
          <CrossHairIcon />
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
          <BottomSheetContent
            context={context}
            albums={albums}
            albumDetailById={albumDetailById}
            onSelectAlbum={onSelectAlbum}
          />
        </S.Content>
      </S.SheetWrapper>
    </>
  );
};

export default BottomSheet;
