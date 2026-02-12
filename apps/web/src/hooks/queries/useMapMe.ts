import { useQuery } from '@tanstack/react-query';
import { getMe, getGetMeQueryKey } from '@repo/api-client';
import { useMemo } from 'react';
import Supercluster from 'supercluster';
import type { MapPin } from '@/types/map.type';

interface UseMapMeParams {
  longitude?: number;
  latitude?: number;
  zoom: number;
  bbox: string;
  albumId?: number | null;
}

interface ClusterPhotoResponse {
  id: number;
  url?: string;
  thumbnailUrl?: string;
  longitude: number;
  latitude: number;
}

/**
 * 클라이언트 clusterId를 생성합니다.
 * 서버 클러스터와 구분하기 위해 "client_" prefix를 사용합니다.
 */
function generateClientClusterId(superclusterId: number, zoom: number): string {
  return `client_z${Math.floor(zoom)}_${superclusterId}`;
}

/**
 * /map/me API를 호출하여 앨범, 사진, 클러스터 데이터를 한 번에 조회
 * - albums: useMapMeAlbums로 별도 관리됨
 * - photos/clusters: 이 훅에서 mapPins로 변환
 * - 줌레벨 >= 17: 클라이언트 측 Supercluster로 동적 클러스터링
 */
export const useMapMe = ({
  longitude,
  latitude,
  zoom,
  bbox,
  albumId,
}: UseMapMeParams) => {
  const isValid = !!(longitude !== undefined && latitude !== undefined && bbox);
  const roundedZoom = Math.round(zoom);

  const params = {
    longitude: longitude ?? 0,
    latitude: latitude ?? 0,
    zoom: roundedZoom,
    bbox: bbox || '',
    ...(albumId ? { albumId } : {}),
  };

  const response = useQuery({
    queryKey: getGetMeQueryKey(params),
    queryFn: ({ signal }) => getMe(params, signal),
    enabled: isValid,
  });

  const address = useMemo(() => {
    if (!isValid) return '';
    return response.data?.location?.address ?? '';
  }, [response.data?.location?.address, isValid]);

  // Supercluster 인스턴스 생성 (한 번만)
  const superclusterInstance = useMemo(() => {
    return new Supercluster({
      radius: 60,
      maxZoom: 20,
      minZoom: 17,
      minPoints: 2,
    });
  }, []);

  const mapPins: MapPin[] = useMemo(() => {
    const data = response.data;
    if (!data) return [];

    const photoPins: MapPin[] = (data.photos ?? []).map((photo) => ({
      id: photo.id ?? 0,
      albumId: 0,
      latitude: photo.latitude ?? 0,
      longitude: photo.longitude ?? 0,
      imageUrl: photo.thumbnailUrl ?? '',
      imageCount: 1,
      isCluster: false,
    }));

    const clusterPins: MapPin[] = (data.clusters ?? []).map((cluster) => ({
      id: 0,
      albumId: 0,
      latitude: cluster.latitude ?? 0,
      longitude: cluster.longitude ?? 0,
      imageUrl: cluster.thumbnailUrl ?? '',
      imageCount: cluster.count ?? 1,
      clusterId: cluster.clusterId ?? '',
      isCluster: true,
    }));

    // 줌레벨 < 17: 서버 클러스터 사용
    if (roundedZoom < 17) {
      return clusterPins;
    }

    // 줌레벨 >= 17: 클라이언트 클러스터링
    if (photoPins.length === 0) {
      return [];
    }

    // GeoJSON Feature 형식으로 변환
    // API 응답 데이터로부터 takenAt 추출
    const photoDataMap = new Map((data.photos ?? []).map((photo) => [photo.id, photo]));
    const geoJsonPoints = photoPins.map((pin) => {
      const photoData = photoDataMap.get(pin.id);
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [pin.longitude, pin.latitude], // [lng, lat] 순서 중요!
        },
        properties: {
          id: pin.id,
          albumId: pin.albumId,
          imageUrl: pin.imageUrl,
          takenAt: photoData?.takenAt ?? '',
        },
      };
    }) as GeoJSON.Feature<GeoJSON.Point>[];

    // Supercluster에 데이터 로드
    superclusterInstance.load(geoJsonPoints as any);

    // bbox 파싱
    const bboxValues = bbox.split(',').map(Number);
    if (bboxValues.length !== 4) {
      return photoPins; // bbox가 없으면 개별 핀 반환
    }
    const [west, south, east, north] = bboxValues;

    // 클러스터 조회
    const clusteredResults = superclusterInstance.getClusters(
      [west, south, east, north],
      Math.floor(roundedZoom),
    );

    // MapPin 형식으로 변환
    const mapPinsFromCluster: MapPin[] = clusteredResults.map((feature) => {
      const [lng, lat] = feature.geometry.coordinates;

      if (feature.properties.cluster) {
        // 클러스터
        const pointCount = feature.properties.point_count;
        const clusterId = feature.properties.cluster_id;

        // 클러스터의 첫 번째 사진 썸네일
        const leaves = superclusterInstance.getLeaves(clusterId, 1);
        const thumbnailUrl = leaves[0]?.properties.imageUrl ?? '';

        return {
          id: 0,
          albumId: 0,
          latitude: lat,
          longitude: lng,
          imageUrl: thumbnailUrl,
          imageCount: pointCount,
          clusterId: generateClientClusterId(clusterId, roundedZoom),
          isCluster: true,
        };
      }

      // 개별 포인트
      return {
        id: feature.properties.id,
        albumId: feature.properties.albumId,
        latitude: lat,
        longitude: lng,
        imageUrl: feature.properties.imageUrl,
        imageCount: 1,
        isCluster: false,
      };
    });

    return mapPinsFromCluster;
  }, [response.data, roundedZoom, bbox, superclusterInstance]);

  // 클라이언트 클러스터의 사진 데이터 매핑
  const clusterExpansionData = useMemo(() => {
    const map = new Map<string, ClusterPhotoResponse[]>();

    if (roundedZoom >= 17 && superclusterInstance) {
      const data = response.data;
      if (!data?.photos) return map;

      // GeoJSON 포인트 재생성 (mapPins 계산과 동일)
      const photoMap = new Map((data.photos ?? []).map((photo) => [photo.id, photo]));
      const photoPins: MapPin[] = (data.photos ?? []).map((photo) => ({
        id: photo.id ?? 0,
        albumId: 0,
        latitude: photo.latitude ?? 0,
        longitude: photo.longitude ?? 0,
        imageUrl: photo.thumbnailUrl ?? '',
        imageCount: 1,
        isCluster: false,
      }));

      if (photoPins.length === 0) return map;

      const geoJsonPoints = photoPins.map((pin) => {
        const photoData = photoMap.get(pin.id);
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [pin.longitude, pin.latitude],
          },
          properties: {
            id: pin.id,
            albumId: pin.albumId,
            imageUrl: pin.imageUrl,
            takenAt: photoData?.takenAt ?? '',
          },
        };
      }) as GeoJSON.Feature<GeoJSON.Point>[];

      // Supercluster에 데이터 재로드
      superclusterInstance.load(geoJsonPoints as any);

      // 클러스터 조회
      const bboxValues = bbox.split(',').map(Number);
      if (bboxValues.length !== 4) return map;

      const [west, south, east, north] = bboxValues;
      const clusteredResults = superclusterInstance.getClusters(
        [west, south, east, north],
        Math.floor(roundedZoom),
      );

      // 각 클러스터의 사진 데이터 추출
      clusteredResults.forEach((feature) => {
        if (feature.properties.cluster) {
          const superClusterId = feature.properties.cluster_id;
          const clientClusterId = generateClientClusterId(superClusterId, roundedZoom);

          // 클러스터의 모든 포인트 조회
          const leaves = superclusterInstance.getLeaves(superClusterId, Infinity);

          const photos: ClusterPhotoResponse[] = leaves.map((leaf) => ({
            id: leaf.properties.id,
            url: leaf.properties.imageUrl,
            thumbnailUrl: leaf.properties.imageUrl,
            longitude: leaf.geometry.coordinates[0],
            latitude: leaf.geometry.coordinates[1],
            takenAt: leaf.properties.takenAt,
          }));

          map.set(clientClusterId, photos);
        }
      });
    }

    return map;
  }, [response.data, roundedZoom, bbox, superclusterInstance]);

  return {
    address,
    mapPins,
    totalHistoryCount: response.data?.totalHistoryCount,
    clusters: response.data?.clusters ?? [],
    photos: response.data?.photos ?? [],
    clusterExpansionData,
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
  };
};
