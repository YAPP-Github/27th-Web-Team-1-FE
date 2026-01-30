import { ReactNode } from 'react';

interface MapLayoutProps {
  children: ReactNode;
}

const MapLayout = ({ children }: MapLayoutProps) => {
  return <>{children}</>;
};

export default MapLayout;
