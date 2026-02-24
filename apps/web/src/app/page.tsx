import { Suspense } from 'react';
import MapRoute from './_components/MapRoute';

export default function Home() {
  return (
    <Suspense>
      <MapRoute />
    </Suspense>
  );
}
