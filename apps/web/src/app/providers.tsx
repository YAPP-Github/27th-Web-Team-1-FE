'use client';

import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { theme } from '@/theme';
import { EnableMockClient } from '@/mocks/EnableMockClient';
import GlobalStyles from '@/theme/globalStyles';
import { setAuthHeaderProvider, setErrorCaptureProvider } from '@repo/api-client';
import { captureApiError } from '@repo/sentry/captureApiError';
import { ToastProvider } from '@/components/toast';
import { PhotoProvider } from './photo/_contexts/PhotoContext';
import { PendingPhotosProvider } from '@/stores/pendingPhotos/PendingPhotosContext';

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
    setErrorCaptureProvider(captureApiError);

    return () => {
      setAuthHeaderProvider(null);
      setErrorCaptureProvider(null);
    };
  }, []);

  // Kakao SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      const kakao = window.Kakao;
      const javascriptKey = process.env.NEXT_PUBLIC_JAVASCRIPT_KEY;

      if (kakao && javascriptKey && !kakao.isInitialized()) {
        kakao.init(javascriptKey);
      }
    };

    if (window.Kakao) {
      initKakao();
    } else {
      const timer = setTimeout(initKakao, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const content = (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <PhotoProvider>
            <ToastProvider>
              <PendingPhotosProvider>{children}</PendingPhotosProvider>
            </ToastProvider>
          </PhotoProvider>
          {showDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );

  return (
    <>
      {enableMocking && <EnableMockClient />}
      {content}
    </>
  );
}
