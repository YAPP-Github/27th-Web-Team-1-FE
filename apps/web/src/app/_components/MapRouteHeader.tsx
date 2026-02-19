'use client';

import {
  SHEET_CONTEXT_TYPE,
  type SheetContext,
} from '@/components/bottomSheet/constants';
import { ExploreHeader, MenuHeader } from '@/components/header';
import { DEFAULT_ALBUM_TITLE } from '@/constants';
import type { LocationInfoResponse } from '@repo/api-client';

interface MapRouteHeaderProps {
  sheetContext: SheetContext;
  selectedAlbumTitle: string | undefined;
  clusterLocationData: LocationInfoResponse | undefined;
  address: string | null;
  onCloseAlbumDetail: () => void;
  onOpenAlbumRename: () => void;
  onOpenAlbumDelete: () => void;
  onCloseClusterDetail: () => void;
}

/**
 * 지도 페이지의 헤더를 렌더링하는 컴포넌트
 * - 앨범 상세: 앨범 제목과 메뉴 (이름변경, 삭제)
 * - 클러스터 상세: 위치 정보
 * - 기본 상태: 사용자의 현재 주소
 */
export const MapRouteHeader = ({
  sheetContext,
  selectedAlbumTitle,
  clusterLocationData,
  address,
  onCloseAlbumDetail,
  onOpenAlbumRename,
  onOpenAlbumDelete,
  onCloseClusterDetail,
}: MapRouteHeaderProps) => {
  if (sheetContext.type === SHEET_CONTEXT_TYPE.ALBUM_DETAIL) {
    const isDefaultAlbum = selectedAlbumTitle === DEFAULT_ALBUM_TITLE;
    return (
      <MenuHeader
        title={selectedAlbumTitle ?? '앨범'}
        onClickBack={onCloseAlbumDetail}
        showMenu={!isDefaultAlbum}
      >
        {!isDefaultAlbum && (
          <MenuHeader.Menu>
            <MenuHeader.Item onClick={onOpenAlbumRename}>앨범 이름 변경</MenuHeader.Item>
            <MenuHeader.Item variant="danger" onClick={onOpenAlbumDelete}>
              앨범 삭제
            </MenuHeader.Item>
          </MenuHeader.Menu>
        )}
      </MenuHeader>
    );
  }

  if (sheetContext.type === SHEET_CONTEXT_TYPE.CLUSTER_DETAIL) {
    return (
      <MenuHeader
        title={clusterLocationData?.address ?? '위치 로딩 중...'}
        onClickBack={onCloseClusterDetail}
        showMenu={false}
      />
    );
  }

  return (
    <ExploreHeader
      title={address || '위치 정보 로딩 중'}
      onClickProfile={() => {}}
      onClickExplore={() => {}}
    />
  );
};
