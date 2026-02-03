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
    // 쿠키 기반 인증에서는 Authorization 헤더가 필요하지 않음
    // 모든 요청에서 브라우저가 자동으로 쿠키 전송
    setAuthHeaderProvider(null);

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
