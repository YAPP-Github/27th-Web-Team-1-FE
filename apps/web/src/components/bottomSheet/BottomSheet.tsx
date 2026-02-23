'use client';

import AddIcon from '@/assets/images/add.svg';
import CrossHairIcon from '@/assets/images/crossHair.svg';
import MapPinIcon from '@/assets/images/mapPin.svg';
import CircleButton from '@/components/buttons/circleButton/CircleButton';
import FloatingButton from '@/components/buttons/floatingButton/FloatingButton';
import { ROUTES } from '@/constants/routes';
import type {
  AlbumThumbnails,
  AlbumWithPhotosResponse,
  ClusterPhotoResponse,
} from '@repo/api-client';
import type { DisplayPhoto } from '@/stores/pendingPhotos/types';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import HomeEmptyState from './HomeEmptyState';
import MenuButton from '../buttons/menuButton/MenuButton';
import TextButton from '../buttons/textButton/TextButton';
import { useBottomSheetController } from './_hooks/useBottomSheetController';
import * as S from './BottomSheet.styles';
import BottomSheetContent from './bottomSheetContent/BottomSheetContent';
import { SHEET_CONTEXT_TYPE, SheetContext } from './constants';
import { usePhotoContext } from '@/app/photo/_contexts/PhotoContext';
import { usePhotoSelect } from '@/app/photo/add/_hooks/usePhotoSelect';
import type { SelectedPhoto } from '@/app/photo/add/_types/photo';

interface BottomSheetProps {
  context: SheetContext;
  albums: AlbumThumbnails[];
  albumDetailById: Record<number, AlbumWithPhotosResponse>;
  displayPhotos: DisplayPhoto[];
  photoCount: number;
  onChangeContext: (context: SheetContext) => void;
  onSelectAlbum: (albumId: number) => void;
  onGoToCurrentLocation: () => void;
  onOpenAddAlbumModal?: () => void;
  onRenameAlbum: (albumId: number, albumTitle: string) => void;
  onDeleteAlbum: (albumId: number) => void;
  clusterExpansionData?: Map<string, ClusterPhotoResponse[]>;
}

const BottomSheet = ({
  context,
  albums,
  albumDetailById,
  displayPhotos,
  photoCount,
  onChangeContext,
  onSelectAlbum,
  onGoToCurrentLocation,
  onOpenAddAlbumModal,
  onRenameAlbum,
  onDeleteAlbum,
  clusterExpansionData,
}: BottomSheetProps) => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const { addPhotos, setSelectedPhoto, setInitialAlbumId, resetPhotoNoteState } =
    usePhotoContext();

  /**
   * 웹 브라우저 환경에서는 보안 정책상 사용자의 전체 갤러리에 접근할 수 없음.
   * 따라서 파일 선택 시 바로 정보 기입 화면으로 이동하는 방식으로 구현.
   *
   * 네이티브 앱(React Native)에서는 갤러리 접근 권한을 받아 전체 사진 목록을
   * 표시할 수 있으므로, 앱 버전에서는 사진 선택 UI를 사용할 예정.
   */
  const handlePhotosSelected = useCallback(
    (newPhotos: SelectedPhoto[]) => {
      addPhotos(newPhotos);
      if (newPhotos.length > 0) {
        setSelectedPhoto(newPhotos[0]);
        resetPhotoNoteState(newPhotos[0]);
        const albumId =
          context.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL ? context.albumId : null;
        setInitialAlbumId(albumId);
        router.push(ROUTES.PHOTO.NOTE.ADD);
      }
    },
    [
      addPhotos,
      setSelectedPhoto,
      resetPhotoNoteState,
      setInitialAlbumId,
      router,
      context,
    ],
  );

  const { selectPhotosFromFile } = usePhotoSelect({
    onPhotosSelected: handlePhotosSelected,
  });

  const {
    height,
    setHeight,
    clampHeight,
    snapHeightOnly,
    deriveContextFromHeight,
    MID_HEIGHT,
    showFloatingButton,
    showActionButtons,
    isMaxHeight,
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

    const snappedHeight = snapHeightOnly(height);

    if (snappedHeight > MID_HEIGHT && context.type === SHEET_CONTEXT_TYPE.ALBUM_LIST) {
      return;
    }

    const derivedContext = deriveContextFromHeight(snappedHeight);

    if (photoCount === 0 && derivedContext.type === SHEET_CONTEXT_TYPE.ALBUM_LIST) {
      onChangeContext({ type: SHEET_CONTEXT_TYPE.HOME });
      return;
    }

    onChangeContext(derivedContext);
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
      {showActionButtons && (
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
            {/* TODO: 웹에서 사진 촬영 기능 임시 제거 - 추후 앱에서 촬영 기능 구현 시 복구 예정 */}
            {/* <TextButton
              text="사진 촬영"
              onClick={() => router.push(ROUTES.PHOTO.CAPTURE)}
              textAlign="left"
            /> */}
            <TextButton
              text="사진 추가"
              onClick={() => selectPhotosFromFile()}
              textAlign="left"
            />
            <TextButton text="앨범 추가" onClick={handleAddAlbumClick} textAlign="left" />
          </MenuButton>

          <CircleButton aria-label="현재 위치로 이동" onClick={onGoToCurrentLocation}>
            <CrossHairIcon />
          </CircleButton>
        </S.ActionColumn>
      )}

      <S.SheetWrapper
        $height={height}
        $isDragging={isDragging}
        $sheetZIndex={
          context.type === SHEET_CONTEXT_TYPE.ALBUM_LIST && isMaxHeight ? 1011 : 1000
        }
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
          $isMaxHeight={
            height >= (typeof window !== 'undefined' ? window.innerHeight : 800) - 10
          }
          $isHomeContext={context.type === SHEET_CONTEXT_TYPE.HOME}
        >
          {context.type === SHEET_CONTEXT_TYPE.HOME && photoCount === 0 ? (
            <HomeEmptyState
              onAddPhoto={() => selectPhotosFromFile()}
              onAddAlbum={handleAddAlbumClick}
            />
          ) : (
            <BottomSheetContent
              context={context}
              albums={albums}
              albumDetailById={albumDetailById}
              displayPhotos={displayPhotos}
              onSelectAlbum={onSelectAlbum}
              onRenameAlbum={onRenameAlbum}
              onDeleteAlbum={onDeleteAlbum}
              clusterExpansionData={clusterExpansionData}
            />
          )}
        </S.Content>
      </S.SheetWrapper>

      {showFloatingButton && (
        <S.FloatingButtonWrapper>
          <FloatingButton
            text="지도뷰로 보기"
            icon={<MapPinIcon color="#8D8C8F" />}
            onClick={handleFloatingButtonClick}
          />
        </S.FloatingButtonWrapper>
      )}
    </>
  );
};

export default BottomSheet;
