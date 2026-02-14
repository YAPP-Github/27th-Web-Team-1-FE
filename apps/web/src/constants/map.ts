/**
 * 지도 클러스터링 설정 상수
 */
export const MAP_CLUSTERING_CONFIG = {
  /** 클라이언트 클러스터링 시작 줌 레벨 (이 레벨 이상에서 클라이언트 클러스터링 사용) */
  CLIENT_CLUSTERING_MIN_ZOOM: 15,
  /** 클라이언트 클러스터 판별용 prefix */
  CLIENT_CLUSTER_PREFIX: 'client_',
  /** Supercluster 최대 줌 레벨 */
  SUPERCLUSTER_MAX_ZOOM: 20,
  /** Supercluster 클러스터 반지름 (픽셀) */
  SUPERCLUSTER_RADIUS: 60,
  /** Supercluster 최소 포인트 수 */
  SUPERCLUSTER_MIN_POINTS: 2,
} as const;

/**
 * 바운딩박스 기반 줌 레벨 계산 상수
 * 백엔드는 화면에 보이는 범위를 기준으로 확대된 범위를 제공합니다.
 * 이 상수들은 실제 필요한 줌 레벨을 계산할 때 이를 보정하기 위해 사용됩니다.
 */
export const BBOX_ZOOM_CALCULATION = {
  /** 백엔드 경도(가로) 확대 비율 */
  BACKEND_LNG_EXPANSION_RATIO: 3.3,
  /** 백엔드 위도(세로) 확대 비율 */
  BACKEND_LAT_EXPANSION_RATIO: 3,
  /** Mapbox 줌 레벨 계산 시 적용 팩터 */
  ZOOM_LEVEL_ADJUSTMENT_FACTOR: 2.5,
  /** 범위를 계산할 수 없을 때 기본 줌 레벨 */
  DEFAULT_ZOOM: 15,
} as const;
