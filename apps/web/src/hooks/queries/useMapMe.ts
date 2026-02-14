import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getMe, getGetMeQueryKey } from '@repo/api-client';
import { useMemo, useRef, useState, useEffect } from 'react';
import Supercluster from 'supercluster';
import type { MapPin } from '@/types/map.type';
import { MAP_CLUSTERING_CONFIG } from '@/constants/map';
import {
  convertPhotosToGeoJsonFeatures,
  parseBbox,
  convertClusteredResultsToMapPins,
  extractClusterPhotoData,
  type ClusterPhotoResponse,
} from './_utils/mapClustering.calc';

interface UseMapMeParams {
  longitude?: number;
  latitude?: number;
  zoom: number;
  albumId?: number | null;
}

/**
 * /map/me API를 호출하여 앨범, 사진, 클러스터 데이터를 한 번에 조회
 * - albums: useMapMeAlbums로 별도 관리됨
 * - photos/clusters: 이 훅에서 mapPins로 변환
 * - 줌레벨 >= MAP_CLUSTERING_CONFIG.CLIENT_CLUSTERING_MIN_ZOOM: 클라이언트 측 Supercluster로 동적 클러스터링
 */
export const useMapMe = ({ longitude, latitude, zoom, albumId }: UseMapMeParams) => {
  const isValid = longitude !== undefined && latitude !== undefined;
  const [lastDataVersion, setLastDataVersion] = useState<number | undefined>(undefined);

  // 클라이언트 측 클러스터링을 위한 bbox 계산 (longitude, latitude 기반)
  const bbox = useMemo(() => {
    if (longitude !== undefined && latitude !== undefined) {
      const offset = 0.05;
      const west = longitude - offset;
      const south = latitude - offset;
      const east = longitude + offset;
      const north = latitude + offset;
      return `${west},${south},${east},${north}`;
    }
    return '';
  }, [longitude, latitude]);

  const params = useMemo(
    () => ({
      longitude: longitude ?? 0,
      latitude: latitude ?? 0,
      zoom,
      ...(albumId ? { albumId } : {}),
    }),
    [longitude, latitude, zoom, albumId],
  );

  const response = useQuery({
    queryKey: getGetMeQueryKey(params),
    queryFn: ({ signal }) => {
      const requestParams = lastDataVersion ? { ...params, lastDataVersion } : params;
      return getMe(requestParams, signal);
    },
    enabled: isValid,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (
      response.data?.dataVersion !== undefined &&
      response.data.dataVersion !== lastDataVersion
    ) {
      setLastDataVersion(response.data.dataVersion);
    }
  }, [response.data?.dataVersion, lastDataVersion]);

  const address = useMemo(() => {
    if (!isValid) return '';
    return response.data?.location?.address ?? '';
  }, [response.data?.location?.address, isValid]);

  // Supercluster 인스턴스 생성 (한 번만)
  const superclusterInstance = useMemo(() => {
    return new Supercluster({
      radius: MAP_CLUSTERING_CONFIG.SUPERCLUSTER_RADIUS,
      maxZoom: MAP_CLUSTERING_CONFIG.SUPERCLUSTER_MAX_ZOOM,
      minZoom: MAP_CLUSTERING_CONFIG.CLIENT_CLUSTERING_MIN_ZOOM,
      minPoints: MAP_CLUSTERING_CONFIG.SUPERCLUSTER_MIN_POINTS,
    });
  }, []);

  // 클러스터 확장 데이터를 캐싱하여 페이지 이동 후에도 유지
  const clusterExpansionCacheRef = useRef<Map<string, ClusterPhotoResponse[]>>(new Map());

  // 통합 클러스터링 계산 - mapPins와 clusterExpansionData를 한 번에 처리
  // 이전에는 이 로직이 두 개의 useMemo에서 중복되었음
  const clusteringResult = useMemo(() => {
    const data = response.data;
    if (!data) {
      // API 로딩 중이어도 캐시된 클러스터 데이터 유지
      return {
        mapPins: [],
        clusterExpansionData: clusterExpansionCacheRef.current,
      };
    }

    // 줌레벨 < CLIENT_CLUSTERING_MIN_ZOOM: 서버 클러스터 사용
    if (zoom < MAP_CLUSTERING_CONFIG.CLIENT_CLUSTERING_MIN_ZOOM) {
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
      return {
        mapPins: clusterPins,
        clusterExpansionData: clusterExpansionCacheRef.current,
      };
    }

    // 줌레벨 >= CLIENT_CLUSTERING_MIN_ZOOM: 클라이언트 클러스터링
    const photos = data.photos ?? [];
    if (photos.length === 0) {
      return {
        mapPins: [],
        clusterExpansionData: clusterExpansionCacheRef.current,
      };
    }

    // GeoJSON Feature 형식으로 변환 (헬퍼 함수 사용)
    const geoJsonPoints = convertPhotosToGeoJsonFeatures(photos);

    // Supercluster에 데이터 로드
    superclusterInstance.load(geoJsonPoints as any);

    // bbox 파싱 (헬퍼 함수 사용)
    const bboxValues = parseBbox(bbox ?? '');
    if (!bboxValues) {
      // bbox가 없으면 개별 핀으로 반환
      const photoPins: MapPin[] = photos.map((photo) => ({
        id: photo.id ?? 0,
        albumId: 0,
        latitude: photo.latitude ?? 0,
        longitude: photo.longitude ?? 0,
        imageUrl: photo.thumbnailUrl ?? '',
        imageCount: 1,
        isCluster: false,
      }));
      return {
        mapPins: photoPins,
        clusterExpansionData: new Map<string, ClusterPhotoResponse[]>(),
      };
    }

    // 클러스터 조회
    const clusteredResults = superclusterInstance.getClusters(bboxValues, zoom);

    // MapPin 형식으로 변환 (헬퍼 함수 사용)
    const mapPins = convertClusteredResultsToMapPins(
      clusteredResults,
      superclusterInstance,
      zoom,
    );

    // 클러스터별 사진 데이터 추출 (헬퍼 함수 사용)
    const newClusterData = extractClusterPhotoData(
      clusteredResults,
      superclusterInstance,
      zoom,
    );

    // 이전 캐시와 새로운 데이터 병합
    // 페이지 이동 후 돌아왔을 때도 이전 클러스터 데이터 유지
    const mergedClusterExpansionData = new Map(clusterExpansionCacheRef.current);
    newClusterData.forEach((photos, clusterId) => {
      mergedClusterExpansionData.set(clusterId, photos);
    });
    clusterExpansionCacheRef.current = mergedClusterExpansionData;

    return { mapPins, clusterExpansionData: mergedClusterExpansionData };
  }, [response.data, zoom, bbox ?? '', superclusterInstance]);

  // 개별 값 추출 (메모이제이션으로 불필요한 리렌더링 방지)
  const mapPins: MapPin[] = useMemo(
    () => clusteringResult?.mapPins ?? [],
    [clusteringResult],
  );

  const clusterExpansionData = useMemo(
    () =>
      clusteringResult?.clusterExpansionData ?? new Map<string, ClusterPhotoResponse[]>(),
    [clusteringResult],
  );

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
