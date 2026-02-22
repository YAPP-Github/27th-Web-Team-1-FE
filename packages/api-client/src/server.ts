/**
 * 서버 사이드에서만 사용하는 API 함수들
 * (자동으로 쿠키가 포함되는 serverFetcher 사용)
 */

import { serverFetcher } from './serverFetcher';
import type { CoupleStatusResponse } from './model';

/**
 * 현재 로그인 사용자의 커플 연결 상태를 조회합니다. (서버용)
 * @summary 내 커플 상태 조회
 */
export const getMyStatusServer = () => {
  return serverFetcher<CoupleStatusResponse>({
    url: '/couples/me/status',
    method: 'GET',
  });
};
