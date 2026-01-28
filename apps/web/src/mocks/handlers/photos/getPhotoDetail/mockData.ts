import type { PhotoDetailResponse } from '@repo/api-client';

export const 사진_상세_목록: Record<number, PhotoDetailResponse> = {
  1: {
    id: 1,
    url: 'https://picsum.photos/800/1200?random=1',
    takenAt: '2024.01.15',
    albumName: '우리의 추억',
    uploaderName: '김민수',
    address: '서울특별시 강남구 테헤란로 123',
    description: '오늘 정말 좋은 날이었어요! 함께해서 행복했습니다.',
  },
  2: {
    id: 2,
    url: 'https://picsum.photos/800/1200?random=2',
    takenAt: '2024.01.16',
    albumName: '우리의 추억',
    uploaderName: '김민수',
    address: '서울특별시 강남구 역삼동 456',
    description: '맛있는 점심',
  },
  3: {
    id: 3,
    url: 'https://picsum.photos/800/1200?random=3',
    takenAt: '2024.01.17',
    albumName: '우리의 추억',
    uploaderName: '김민수',
    address: '서울특별시 서초구 반포동 789',
    description: '산책하는 중',
  },
  4: {
    id: 4,
    url: 'https://picsum.photos/800/1200?random=4',
    takenAt: '2024.01.18',
    albumName: '우리의 추억',
    uploaderName: '김민수',
    address: '서울특별시 송파구 잠실동 101',
    description: '카페에서',
  },
  5: {
    id: 5,
    url: 'https://picsum.photos/800/1200?random=5',
    takenAt: '2024.01.19',
    albumName: '우리의 추억',
    uploaderName: '김민수',
    address: '서울특별시 마포구 합정동 202',
    description: '저녁 노을',
  },
};

export const 사진_상세_조회_성공: PhotoDetailResponse = 사진_상세_목록[1];
