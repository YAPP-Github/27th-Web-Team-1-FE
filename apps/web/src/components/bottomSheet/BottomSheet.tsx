'use client';

import AddIcon from '@/assets/images/add.svg';
import CrossHairIcon from '@/assets/images/crossHair.svg';
import MapPinIcon from '@/assets/images/mapPin.svg';
import CircleButton from '@/components/buttons/circleButton/CircleButton';
import FloatingButton from '@/components/buttons/floatingButton/FloatingButton';
import { ROUTES } from '@/constants/routes';
import type { AlbumThumbnails, AlbumWithPhotosResponse } from '@repo/api-client';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import MenuButton from '../buttons/menuButton/MenuButton';
import TextButton from '../buttons/textButton/TextButton';
import { useBottomSheetController } from './_hooks/useBottomSheetController';
import * as S from './BottomSheet.styles';
import BottomSheetContent from './bottomSheetContent/BottomSheetContent';
import { SHEET_CONTEXT_TYPE, SheetContext } from './constants';

interface BottomSheetProps {
  context: SheetContext;
  albums: AlbumThumbnails[];
  albumDetailById: Record<number, AlbumWithPhotosResponse>;
  onChangeContext: (context: SheetContext) => void;
  onSelectAlbum: (albumId: number) => void;
  onGoToCurrentLocation: () => void;
  onOpenAddAlbumModal?: () => void;
}

const BottomSheet = ({
  context,
  albums,
  albumDetailById,
  onChangeContext,
  onSelectAlbum,
  onGoToCurrentLocation,
  onOpenAddAlbumModal,
}: BottomSheetProps) => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const {
    height,
    setHeight,
    clampHeight,
    snapHeightOnly,
    deriveContextFromHeight,
    MID_HEIGHT,
    showFloatingButton,
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

    if (
      context.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ||
      context.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL
    ) {
      snapHeightOnly(height);
      return;
    }

    if (height > MID_HEIGHT && context.type === SHEET_CONTEXT_TYPE.ALBUM_LIST) {
      snapHeightOnly(height);
      return;
    }

    onChangeContext(deriveContextFromHeight(height));
  };

  const handleFloatingButtonClick = () => {
    router.push(ROUTES.HOME);
    onChangeContext({ type: SHEET_CONTEXT_TYPE.HOME });
  };

  const handleAddAlbumClick = () => {
    onOpenAddAlbumModal?.();
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
          <TextButton
            text="사진 촬영"
            onClick={() => router.push(ROUTES.PHOTO.CAPTURE)}
            textAlign="left"
          />
          <TextButton
            text="사진 추가"
            onClick={() => router.push(ROUTES.PHOTO.ADD)}
            textAlign="left"
          />
          <TextButton text="앨범 추가" onClick={handleAddAlbumClick} textAlign="left" />
        </MenuButton>

        <CircleButton aria-label="현재 위치로 이동" onClick={onGoToCurrentLocation}>
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

        <S.Content
          $noPadding={
            context.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ||
            context.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL
          }
        >
          <BottomSheetContent
            context={context}
            albums={albums}
            albumDetailById={albumDetailById}
            onSelectAlbum={onSelectAlbum}
          />
        </S.Content>
      </S.SheetWrapper>

      {showFloatingButton && (
        <S.FloatingButtonWrapper>
          <FloatingButton
            text="지도뷰로 보기"
            icon={<MapPinIcon />}
            onClick={handleFloatingButtonClick}
          />
        </S.FloatingButtonWrapper>
      )}
    </>
  );
};

export default BottomSheet;
