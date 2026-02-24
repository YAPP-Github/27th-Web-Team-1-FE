import type { MyPageResponse } from '@repo/api-client';

export const 마이페이지_조회_성공: MyPageResponse = {
  myEmail: 'test@example.com',
  myName: '찬혁',
  myProfileImageUrl:
    'https://img.insight.co.kr/static/2021/12/12/700/img_20211212152735_k568on13.webp',
  partnerName: 'GD?',
  partnerProfileImageUrl:
    'https://img.insight.co.kr/static/2021/12/12/700/img_20211212152827_g3d07ob2.webp',
  firstMetDate: '2024-11-09',
  coupledDay: 365,
  couplePhotoCount: 42,
};

export const 마이페이지_조회_미연결: MyPageResponse = {
  myEmail: 'test@example.com',
  myName: '찬혁',
  myProfileImageUrl:
    'https://img.insight.co.kr/static/2021/12/12/700/img_20211212152735_k568on13.webp',
  partnerName: undefined,
  partnerProfileImageUrl: undefined,
  firstMetDate: undefined,
  coupledDay: undefined,
  couplePhotoCount: 0,
};
