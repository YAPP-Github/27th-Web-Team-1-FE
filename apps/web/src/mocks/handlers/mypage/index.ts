import { createHandler } from '@/mocks/createHandler';
import { mockGetCoupleStatus } from './getCoupleStatus/mockGetCoupleStatus';
import { mockGetMyPage } from './getMyPage/mockGetMyPage';
import { mockUpdateNickname } from './updateNickname/mockUpdateNickname';
import { mockUpdateProfileImage } from './updateProfileImage/mockUpdateProfileImage';

export const mypageHandlers = [
  createHandler(mockGetCoupleStatus, '커플_상태_조회_미연결'),
  createHandler(mockGetMyPage, '마이페이지_조회_미연결'),
  createHandler(mockUpdateNickname, '닉네임_수정_성공'),
  createHandler(mockUpdateProfileImage, '프로필_사진_수정_성공'),
];
