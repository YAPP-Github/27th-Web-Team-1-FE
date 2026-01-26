import { PhotoProvider } from './_contexts/PhotoContext';

export default function PhotoLayout({ children }: { children: React.ReactNode }) {
  return <PhotoProvider>{children}</PhotoProvider>;
}
