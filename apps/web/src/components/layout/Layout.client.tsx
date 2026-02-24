'use client';

import { Container } from './Layout.styles';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
