import type Supercluster from 'supercluster';
import type { MapPin } from '@/types/map.type';
import { MAP_CLUSTERING_CONFIG } from '@/constants/map';

/**
 * 클러스터 내 사진 응답
 *
 * NOTE: 이 타입은 @repo/api-client의 ClusterPhotoResponse와 유사하지만,
 * 클라이언트 클러스터링에 필요한 최소 필드만 포함합니다.
 * API 타입과 호환되도록 필드 이름과 타입을 유지합니다.
 */
export interface ClusterPhotoResponse {
  id: number;
  url?: string;
  thumbnailUrl?: string;
  longitude: number;
  latitude: number;
  takenAt?: string;
}

/**
 * 클라이언트 clusterId를 생성합니다.
 * 서버 클러스터와 구분하기 위해 "client_" prefix를 사용합니다.
 *
 * NOTE: zoom 값을 정수화하여 사용합니다.
 * 클라이언트 클러스터링에서는 데이터는 동일하고 클러스터만 달라지므로,
 * 부동소수점 값으로 중복 캐싱되는 것을 방지합니다.
 *
 * @param superclusterId - Supercluster 내부 ID
 * @param zoom - 현재 줌 레벨
 * @returns "{prefix}{zoom}_{id}" 형식의 클러스터 ID
 */
export function generateClientClusterId(superclusterId: number, zoom: number): string {
  return `${MAP_CLUSTERING_CONFIG.CLIENT_CLUSTER_PREFIX}z${Math.floor(zoom)}_${superclusterId}`;
}

/**
 * API 응답의 사진 데이터를 GeoJSON Feature 형식으로 변환합니다.
 * Supercluster 라이브러리에서 요구하는 형식입니다.
 *
 * @param photos - API 응답의 사진 배열
 * @returns GeoJSON Feature 배열 (Point 타입)
 */
export function convertPhotosToGeoJsonFeatures(
  photos: Array<{
    id?: number;
    thumbnailUrl?: string;
    longitude?: number;
    latitude?: number;
    takenAt?: string;
  }>,
): GeoJSON.Feature<GeoJSON.Point>[] {
  return photos.map((photo) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [photo.longitude ?? 0, photo.latitude ?? 0],
    },
    properties: {
      id: photo.id ?? 0,
      albumId: 0,
      imageUrl: photo.thumbnailUrl ?? '',
      takenAt: photo.takenAt ?? '',
    },
  })) as GeoJSON.Feature<GeoJSON.Point>[];
}

/**
 * 바운딩박스 문자열을 파싱하여 숫자 배열로 변환합니다.
 *
 * @param bbox - "west,south,east,north" 형식의 문자열
 * @returns [west, south, east, north] 배열 또는 null (파싱 실패 시)
 */
export function parseBbox(bbox: string): [number, number, number, number] | null {
  const values = bbox.split(',').map(Number);
  if (values.length !== 4 || values.some(isNaN)) {
    return null;
  }
  return values as [number, number, number, number];
}

/**
 * Supercluster 결과를 MapPin 형식으로 변환합니다.
 * 클러스터와 개별 포인트를 구분하여 처리합니다.
 *
 * @param clusteredResults - Supercluster.getClusters() 결과
 * @param superclusterInstance - 썸네일 조회를 위한 Supercluster 인스턴스
 * @param zoom - 현재 줌 레벨 (클러스터 ID 생성에 사용)
 * @returns MapPin 배열
 */
export function convertClusteredResultsToMapPins(
  clusteredResults: Array<GeoJSON.Feature<GeoJSON.Point>>,
  superclusterInstance: Supercluster,
  zoom: number,
): MapPin[] {
  return clusteredResults.map((feature) => {
    const [lng, lat] = feature.geometry.coordinates;
    const props = feature.properties;

    if (props && props.cluster) {
      const pointCount = props.point_count;
      const clusterId = props.cluster_id;

      const leaves = superclusterInstance.getLeaves(clusterId, 1);
      const thumbnailUrl = leaves[0]?.properties?.imageUrl ?? '';

      return {
        id: 0,
        albumId: 0,
        latitude: lat,
        longitude: lng,
        imageUrl: thumbnailUrl,
        imageCount: pointCount,
        clusterId: generateClientClusterId(clusterId, zoom),
        isCluster: true,
      };
    }

    return {
      id: props?.id ?? 0,
      albumId: props?.albumId ?? 0,
      latitude: lat,
      longitude: lng,
      imageUrl: props?.imageUrl ?? '',
      imageCount: 1,
      isCluster: false,
    };
  });
}

/**
 * 클러스터별 사진 데이터를 추출하여 Map으로 변환합니다.
 *
 * @param clusteredResults - Supercluster.getClusters() 결과
 * @param superclusterInstance - Supercluster 인스턴스
 * @param zoom - 현재 줌 레벨
 * @returns 클러스터 ID -> 사진 배열 매핑
 */
export function extractClusterPhotoData(
  clusteredResults: Array<GeoJSON.Feature<GeoJSON.Point>>,
  superclusterInstance: Supercluster,
  zoom: number,
): Map<string, ClusterPhotoResponse[]> {
  const map = new Map<string, ClusterPhotoResponse[]>();

  clusteredResults.forEach((feature) => {
    const props = feature.properties;
    if (props && props.cluster) {
      const superClusterId = props.cluster_id;
      const clientClusterId = generateClientClusterId(superClusterId, zoom);

      const leaves = superclusterInstance.getLeaves(superClusterId, Infinity);

      const photos: ClusterPhotoResponse[] = leaves.map((leaf) => ({
        id: leaf.properties?.id ?? 0,
        url: leaf.properties?.imageUrl ?? '',
        thumbnailUrl: leaf.properties?.imageUrl ?? '',
        longitude: leaf.geometry.coordinates[0],
        latitude: leaf.geometry.coordinates[1],
        takenAt: leaf.properties?.takenAt,
      }));

      map.set(clientClusterId, photos);
    }
  });

  return map;
}
