'use client';

import type { ReactNode } from 'react';
import { DisconnectProvider } from '../../_contexts/DisconnectContext';

export default function DisconnectFormClient({ children }: { children: ReactNode }) {
  return <DisconnectProvider>{children}</DisconnectProvider>;
}
