export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  EXPLORE: '/explore',
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
  },
  ONBOARDING: {
    START: '/onboarding',
    PROFILE: '/onboarding/profile',
    CONNECT: '/onboarding/connect',
    VERIFY: '/onboarding/verify',
  },
  MYPAGE: '/mypage',
  RECONNECT: '/reconnect',
  DISCONNECT: '/disconnect',
  SIGNOUT: '/signout',
} as const;
