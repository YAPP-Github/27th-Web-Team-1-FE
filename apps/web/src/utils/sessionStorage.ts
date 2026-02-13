/**
 * 클러스터 sessionStorage 키 생성
 * @param clusterId - 클러스터 ID (client_* 또는 일반 clusterId)
 * @returns sessionStorage 키
 */
export const getClusterSessionKey = (clusterId: string): string => {
  return `cluster_${clusterId}`;
};

/**
 * 클러스터 데이터를 sessionStorage에 저장
 * @param clusterId - 클러스터 ID
 * @param data - 저장할 데이터
 */
export const saveClusterToSession = <T>(clusterId: string, data: T): void => {
  if (typeof window === 'undefined') return;

  const sessionKey = getClusterSessionKey(clusterId);
  try {
    sessionStorage.setItem(sessionKey, JSON.stringify(data));
  } catch (error) {
    console.error('[sessionStorage] Failed to save cluster data:', error);
  }
};

/**
 * sessionStorage에서 클러스터 데이터를 가져옴
 * @param clusterId - 클러스터 ID
 * @returns 저장된 데이터 또는 null
 */
export const getClusterFromSession = <T>(clusterId: string): T | null => {
  if (typeof window === 'undefined') return null;

  const sessionKey = getClusterSessionKey(clusterId);
  try {
    const stored = sessionStorage.getItem(sessionKey);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('[sessionStorage] Failed to parse cluster data:', error);
    return null;
  }
};
