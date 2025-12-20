'use client';

import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useMemo, useState } from 'react';
import { theme } from '@/theme';
import { MSWProvider } from '@/mocks/MSWProvider';

export type AppProvidersProps = PropsWithChildren<{
  showDevtools?: boolean;
  enableMocking?: boolean;
}>;

export function AppProviders({
  children,
  showDevtools = true,
  enableMocking = false,
}: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  const cache = useMemo(() => createCache({ key: 'web', prepend: true }), []);

  const content = (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
          {showDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );

  if (enableMocking) {
    return <MSWProvider>{content}</MSWProvider>;
  }

  return content;
}
