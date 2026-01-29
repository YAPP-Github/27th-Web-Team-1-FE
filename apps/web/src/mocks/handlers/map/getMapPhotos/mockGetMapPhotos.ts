import { http, HttpResponse, delay } from 'msw';
import type { MapPhotosResponse } from '@repo/api-client';
import { allMapPhotos, allClusters } from './mockData';

export const mockGetMapPhotosHandler = http.get('*/map/photos', async ({ request }) => {
  await delay(300);

  const url = new URL(request.url);
  const zoom = Number(url.searchParams.get('zoom') ?? 14);
  const albumId = url.searchParams.get('albumId');

  const filteredPhotos = albumId
    ? allMapPhotos.filter((photo) => photo.albumId === Number(albumId))
    : allMapPhotos;

  const filteredClusters = albumId
    ? allClusters.filter((cluster) => cluster.albumId === Number(albumId))
    : allClusters;

  const data: MapPhotosResponse =
    zoom >= 15
      ? { clusters: [], photos: filteredPhotos }
      : { clusters: filteredClusters, photos: [] };

  return HttpResponse.json(data, { status: 200 });
});
