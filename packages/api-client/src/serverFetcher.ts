import { customFetcher } from './customFetcher';

type FetcherConfig = {
  url: string;
  method: string;
  signal?: AbortSignal;
  headers?: HeadersInit;
  body?: unknown;
  data?: unknown;
  params?: Record<string, unknown>;
  pathParams?: Record<string, string | number>;
};

/**
 * Next.js 서버 환경에서 쿠키를 자동으로 추가하는 fetcher
 */
export async function serverFetcher<TResponse>(
  config: FetcherConfig,
  options: RequestInit = {},
): Promise<TResponse> {
  // 서버사이드에서 쿠키를 명시적으로 헤더에 추가
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();

      const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join('; ');

      return customFetcher<TResponse>(config, {
        ...options,
        cache: 'no-store',
        headers: {
          ...config.headers,
          ...options.headers,
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
      });
    } catch (error) {
      console.warn('[serverFetcher] cookies() unavailable:', error);
    }
  }

  return customFetcher<TResponse>(config, options);
}
