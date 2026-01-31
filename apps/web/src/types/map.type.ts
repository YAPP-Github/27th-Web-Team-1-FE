export interface LocationState {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface MapPin {
  id: number;
  albumId: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
  imageCount: number;
  clusterId?: string;
  isCluster: boolean;
}
