export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ALBUM: {
    DETAIL: (albumId: number) => `/album/${albumId}`,
  },
  PHOTO: {
    ADD: '/photo/add',
    CAPTURE: '/photo/capture',
    NOTE: {
      ADD: '/photo/add/note',
    },
    VIEW: (photoId: number, albumId?: number) =>
      albumId ? `/photo/${photoId}?albumId=${albumId}` : `/photo/${photoId}`,
    VIEW_WITH_CLUSTER: (photoId: number, clusterId: string) =>
      `/photo/${photoId}?clusterId=${clusterId}`,
    PREVIEW: '/photo/preview',
  },
  ONBOARDING: {
    START: '/onboarding',
    PROFILE: '/onboarding/profile',
    CONNECT: '/onboarding/connect',
    VERIFY: '/onboarding/verify',
  },
} as const;
