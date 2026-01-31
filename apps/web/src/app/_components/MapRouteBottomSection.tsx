'use client';

import BottomSheet from '@/components/bottomSheet/BottomSheet';
import FloatingButton from '@/components/buttons/floatingButton/FloatingButton';
import { type SheetContext } from '@/components/bottomSheet/constants';
import type { AlbumWithPhotosResponse } from '@repo/api-client';
import * as S from '../page.styles';

interface MapRouteBottomSectionProps {
  sheetContext: SheetContext;
  albumList: AlbumWithPhotosResponse[];
  albumDetailById: Record<number, AlbumWithPhotosResponse>;
  photoCount: number;
  onChangeContext: (context: SheetContext) => void;
  onSelectAlbum: (albumId: number) => void;
  onGoToCurrentLocation: () => void;
  onOpenAddAlbumModal?: () => void;
}

/**
 * 지도 페이지의 하단 영역(바텀시트, 플로팅 버튼)을 렌더링하는 컴포넌트
 * - 앨범 목록 및 상세 정보를 바텀시트로 표시
 * - 현재 상태에 따른 사진 개수 표시
 */
export const MapRouteBottomSection = ({
  sheetContext,
  albumList,
  albumDetailById,
  photoCount,
  onChangeContext,
  onSelectAlbum,
  onGoToCurrentLocation,
  onOpenAddAlbumModal,
}: MapRouteBottomSectionProps) => {
  return (
    <>
      <BottomSheet
        context={sheetContext}
        albums={albumList}
        albumDetailById={albumDetailById}
        onChangeContext={onChangeContext}
        onSelectAlbum={onSelectAlbum}
        onGoToCurrentLocation={onGoToCurrentLocation}
        onOpenAddAlbumModal={onOpenAddAlbumModal}
      />
      <S.FloatingButtonWrapper>
        <FloatingButton text={`기록 ${photoCount}개`} />
      </S.FloatingButtonWrapper>
    </>
  );
};
