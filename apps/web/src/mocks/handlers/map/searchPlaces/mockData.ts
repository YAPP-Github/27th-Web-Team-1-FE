import { PlaceSearchResponse } from '@repo/api-client';

export const 장소_검색_성공: PlaceSearchResponse = {
  places: [
    {
      placeName: '스타벅스 강남대로점',
      address: '서울특별시 강남구 강남대로 390',
      roadAddress: '서울특별시 강남구 강남대로 390',
      latitude: 37.4979,
      longitude: 127.0276,
      category: '카페',
    },
    {
      placeName: '코엑스몰',
      address: '서울특별시 강남구 삼성동 159',
      roadAddress: '서울특별시 강남구 영동대로 513',
      latitude: 37.5118,
      longitude: 127.0591,
      category: '쇼핑',
    },
    {
      placeName: '롯데월드타워',
      address: '서울특별시 송파구 잠실동 29',
      roadAddress: '서울특별시 송파구 올림픽로 300',
      latitude: 37.5125,
      longitude: 127.1025,
      category: '관광명소',
    },
    {
      placeName: '경복궁',
      address: '서울특별시 종로구 세종로 1-1',
      roadAddress: '서울특별시 종로구 사직로 161',
      latitude: 37.5796,
      longitude: 126.977,
      category: '관광명소',
    },
    {
      placeName: '남산타워',
      address: '서울특별시 용산구 용산동2가 산1-3',
      roadAddress: '서울특별시 용산구 남산공원길 105',
      latitude: 37.5512,
      longitude: 126.9882,
      category: '관광명소',
    },
    {
      placeName: '홍대입구역',
      address: '서울특별시 마포구 동교동 165-2',
      roadAddress: '서울특별시 마포구 양화로 160',
      latitude: 37.5571,
      longitude: 126.9236,
      category: '교통',
    },
    {
      placeName: '이태원 경리단길',
      address: '서울특별시 용산구 이태원동',
      roadAddress: '서울특별시 용산구 회나무로',
      latitude: 37.5407,
      longitude: 126.9877,
      category: '거리',
    },
    {
      placeName: '북촌한옥마을',
      address: '서울특별시 종로구 계동 37',
      roadAddress: '서울특별시 종로구 계동길 37',
      latitude: 37.5826,
      longitude: 126.9831,
      category: '관광명소',
    },
  ],
};

export const 장소_검색_결과없음: PlaceSearchResponse = {
  places: [],
};
