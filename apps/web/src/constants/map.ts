/**
 * 지도 클러스터링 설정 상수
 */
export const MAP_CLUSTERING_CONFIG = {
  /** 클라이언트 클러스터링 시작 줌 레벨 (이 레벨 이상에서 클라이언트 클러스터링 사용) */
  CLIENT_CLUSTERING_MIN_ZOOM: 15,
  /** Supercluster 최대 줌 레벨 */
  SUPERCLUSTER_MAX_ZOOM: 20,
  /** Supercluster 클러스터 반지름 (픽셀) */
  SUPERCLUSTER_RADIUS: 60,
  /** Supercluster 최소 포인트 수 */
  SUPERCLUSTER_MIN_POINTS: 2,
} as const;
