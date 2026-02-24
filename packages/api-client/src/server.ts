/**
 * 서버 사이드에서만 사용하는 API 함수들
 * (자동으로 쿠키가 포함되는 serverFetcher 사용)
 */

import { serverFetcher } from './serverFetcher';
import type { CoupleStatusResponse, InviteCodeResponse, MyPageResponse } from './model';

const SERVER_API_URL = {
  COUPLES_STATUS: '/couples/me/status',
  COUPLES_INVITES: '/couples/invites',
  MY_PAGE: '/my-page',
} as const;

/**
 * 현재 로그인 사용자의 커플 연결 상태를 조회합니다. (서버용)
 * @summary 내 커플 상태 조회
 */
export const getMyStatusServer = () => {
  return serverFetcher<CoupleStatusResponse>({
    url: SERVER_API_URL.COUPLES_STATUS,
    method: 'GET',
  });
};

/**
 * 초대코드를 생성하거나 활성 코드가 있으면 재사용합니다. (서버용)
 * @summary 초대코드 생성
 */
export const createInviteServer = () => {
  return serverFetcher<InviteCodeResponse>({
    url: SERVER_API_URL.COUPLES_INVITES,
    method: 'POST',
  });
};

/**
 * 마이페이지 데이터를 조회합니다. (서버용)
 * @summary 마이페이지 조회
 */
export const getMyPageServer = () => {
  return serverFetcher<MyPageResponse>({
    url: SERVER_API_URL.MY_PAGE,
    method: 'GET',
  });
};
