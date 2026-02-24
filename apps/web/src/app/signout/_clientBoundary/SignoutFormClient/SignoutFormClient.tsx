'use client';

import type { ReactNode } from 'react';
import { SignoutProvider } from '../../_contexts/SignoutContext';

export default function SignoutFormClient({ children }: { children: ReactNode }) {
  return <SignoutProvider>{children}</SignoutProvider>;
}
