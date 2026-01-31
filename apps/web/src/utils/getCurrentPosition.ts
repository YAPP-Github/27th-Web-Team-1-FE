const GEOLOCATION_TIMEOUT = 10_000;

export const getCurrentPosition = (): Promise<GeolocationPosition | null> => {
  if (!navigator.geolocation) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      () => resolve(null),
      {
        enableHighAccuracy: true,
        timeout: GEOLOCATION_TIMEOUT,
      },
    );
  });
};
