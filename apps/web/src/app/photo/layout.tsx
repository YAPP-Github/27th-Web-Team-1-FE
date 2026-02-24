import { Suspense } from 'react';

export default function PhotoLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
