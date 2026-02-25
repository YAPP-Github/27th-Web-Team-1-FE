'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SHEET_CONTEXT_TYPE, SheetContext } from '@/components/bottomSheet/constants';
import { extractAlbumIdFromPath, getSelectedAlbumId } from '../_utils/mapRoute.calc';

interface UseMapRouteSheetContextReturn {
  sheetContext: SheetContext;
  setSheetContext: (context: SheetContext) => void;
  selectedAlbumId: number | null;
  albumIdFromPath: number | null;
}

/**
 * 바텀시트와 네비게이션 상태를 관리하는 커스텀 훅
 * - 바텀시트의 현재 컨텍스트를 추적
 * - URL 경로에서 앨범 ID를 자동으로 감지
 * - 경로 변경 시 바텀시트 상태를 동기화
 */
export const useMapRouteSheetContext = (): UseMapRouteSheetContextReturn => {
  const pathname = usePathname();
  // URL 경로에서 앨범 ID 추출
  const albumIdFromPath = useMemo(() => {
    return extractAlbumIdFromPath(pathname);
  }, [pathname]);

  // 초기 상태를 URL 경로 기반으로 설정
  const [sheetContext, setSheetContext] = useState<SheetContext>(() => {
    if (albumIdFromPath) {
      return { type: SHEET_CONTEXT_TYPE.ALBUM_DETAIL, albumId: albumIdFromPath };
    }
    return { type: SHEET_CONTEXT_TYPE.HOME };
  });

  // 경로가 변경되었을 때 바텀시트 상태 동기화
  useEffect(() => {
    if (albumIdFromPath) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 경로 변경 시 바텀시트 상태 동기화
      setSheetContext({
        type: SHEET_CONTEXT_TYPE.ALBUM_DETAIL,
        albumId: albumIdFromPath,
      });
    } else {
      setSheetContext({ type: SHEET_CONTEXT_TYPE.HOME });
    }
  }, [albumIdFromPath]);

  // 선택된 앨범 ID 계산
  const selectedAlbumId = useMemo(() => {
    return getSelectedAlbumId(albumIdFromPath, sheetContext);
  }, [albumIdFromPath, sheetContext]);

  return {
    sheetContext,
    setSheetContext,
    selectedAlbumId,
    albumIdFromPath,
  };
};
