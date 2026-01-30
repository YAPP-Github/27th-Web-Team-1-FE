'use client';

import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { theme } from '@/theme';
import { MSWProvider } from '@/mocks/MSWProvider';
import GlobalStyles from '@/theme/globalStyles';
import { setAuthHeaderProvider } from '@repo/api-client';
import { getAuthorizationHeader } from '@/auth/cookies';
import { API_URL } from '@/constants/apiUrl';
import { ToastProvider } from '@/components/toast';

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

  useEffect(() => {
    setAuthHeaderProvider((config) => {
      if (config.url.includes(API_URL.AUTH.LOGIN)) {
        return undefined;
      }
      return getAuthorizationHeader();
    });

    return () => {
      setAuthHeaderProvider(null);
    };
  }, []);

  const content = (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <ToastProvider>{children}</ToastProvider>
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
