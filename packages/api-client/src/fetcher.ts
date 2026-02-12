import { captureApiError } from '@repo/sentry/captureApiError';

export type ApiErrorData = {
  errorCode: string;
  detail: string;
  instance: string;
  errors: Record<string, string> | null;
};

export type ApiErrorResponse = {
  code: number;
  message: string;
  data: ApiErrorData;
};

export class ApiError extends Error {
  code: number;
  errorCode: string;
  detail: string;
  instance: string;
  errors: Record<string, string> | null;
  data: ApiErrorData;

  constructor(response: ApiErrorResponse) {
    super(response.data.detail || response.message);
    this.name = 'ApiError';
    this.code = response.code;
    this.errorCode = response.data.errorCode;
    this.detail = response.data.detail;
    this.instance = response.data.instance;
    this.errors = response.data.errors;
    this.data = response.data;
  }
}

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

export type AuthHeaderProvider = (config: FetcherConfig) => string | undefined;

let authHeaderProvider: AuthHeaderProvider | null = null;

export const setAuthHeaderProvider = (provider: AuthHeaderProvider | null) => {
  authHeaderProvider = provider;
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

function resolveBaseUrl() {
  if (typeof process === 'undefined') {
    return '';
  }

  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    process.env.API_BASE_URL ??
    ''
  );
}

function joinUrl(url: string, baseUrl: string) {
  if (url.startsWith('http')) {
    return url;
  }

  if (!baseUrl) {
    return url;
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = url.startsWith('/') ? url : `/${url}`;

  return `${normalizedBase}${normalizedPath}`;
}

/**
 * Path parameter 치환: /users/{userId} → /users/123
 */
export function buildUrlWithPathParams(
  url: string,
  pathParams?: Record<string, string | number>,
): string {
  if (!pathParams || Object.keys(pathParams).length === 0) {
    return url;
  }

  let result = url;
  Object.entries(pathParams).forEach(([key, value]) => {
    const encodedValue = encodeURIComponent(String(value));
    // {paramName} 형식 치환 (모든 occurrence)
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), encodedValue);
    // :paramName 형식도 지원 (모든 occurrence)
    result = result.replace(new RegExp(`:${key}(?=/|$)`, 'g'), encodedValue);
  });

  return result;
}

/**
 * Query parameter 추가: /users → /users?page=1&limit=10
 */
export function buildUrlWithQueryParams(
  url: string,
  params?: Record<string, unknown>,
): string {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (typeof value === 'string') {
      searchParams.append(key, value);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      searchParams.append(key, String(value));
    } else {
      searchParams.append(key, JSON.stringify(value));
    }
  });

  const queryString = searchParams.toString();
  if (!queryString) {
    return url;
  }

  return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
}

// Token refresh 관련 변수 및 함수
let isRefreshing = false;
let refreshSubscribers: Array<() => void> = [];

const subscribeTokenRefresh = (cb: () => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = () => {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
};

function mergeHeaders(...sources: (HeadersInit | undefined)[]): Headers {
  const merged = new Headers();

  for (const source of sources) {
    if (!source) continue;

    if (source instanceof Headers) {
      source.forEach((value, key) => merged.set(key, value));
    } else if (Array.isArray(source)) {
      source.forEach(([key, value]) => merged.set(key, value));
    } else {
      Object.entries(source).forEach(([key, value]) => merged.set(key, value));
    }
  }

  return merged;
}

export async function customFetcher<TResponse>(
  config: FetcherConfig,
  options: RequestInit = {},
): Promise<TResponse> {
  const baseUrl = resolveBaseUrl();
  const baseTargetUrl = joinUrl(config.url, baseUrl);
  const urlWithPath = buildUrlWithPathParams(baseTargetUrl, config.pathParams);
  const targetUrl = buildUrlWithQueryParams(urlWithPath, config.params);
  const body = config.body ?? config.data;
  const headers = mergeHeaders(DEFAULT_HEADERS, config.headers, options.headers);

  // Authorization 헤더 설정 (authHeaderProvider 사용)
  if (!headers.has('Authorization')) {
    const authHeader = authHeaderProvider?.(config);
    if (authHeader) {
      headers.set('Authorization', authHeader);
    }
  }

  const response = await fetch(targetUrl, {
    method: config.method,
    body: body ? JSON.stringify(body) : undefined,
    signal: config.signal,
    headers,
    credentials: 'include',
    ...options,
  });

  // 토큰 만료 시 자동 갱신 및 재시도
  if (response.status === 401) {
    // /auth/ 엔드포인트 자체는 갱신하지 않음
    if (config.url.includes('/auth/')) {
      let errorResponse: ApiErrorResponse;
      try {
        errorResponse = (await response.json()) as ApiErrorResponse;
      } catch {
        errorResponse = {
          code: 401,
          message: 'Unauthorized',
          data: {
            errorCode: 'UNAUTHORIZED',
            detail: '',
            instance: '',
            errors: null,
          },
        };
      }
      const apiError = new ApiError(errorResponse);
      captureApiError(apiError);
      throw apiError;
    }

    // TODO: 이미 재시도한 요청이면 무한 루프 방지

    // 이미 refresh 중인지 확인
    if (isRefreshing) {
      return new Promise<TResponse>((resolve, reject) => {
        subscribeTokenRefresh(() => {
          customFetcher<TResponse>(config, options).then(resolve).catch(reject);
        });
      });
    }

    isRefreshing = true;

    try {
      // Refresh API 호출 (refreshToken은 쿠키로 자동 전송)
      const refreshResponse = await fetch(joinUrl('/auth/refresh', baseUrl), {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!refreshResponse.ok) {
        throw new Error('Token refresh failed');
      }

      // 새 토큰이 쿠키에 설정됨
      isRefreshing = false;
      onRefreshed();

      // 원래 요청 재시도
      return customFetcher<TResponse>(config, options);
    } catch (error) {
      isRefreshing = false;
      refreshSubscribers = [];

      // Refresh 실패 시 로그인 페이지로
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }

      throw error;
    }
  }

  if (!response.ok) {
    let errorResponse: ApiErrorResponse;
    try {
      errorResponse = (await response.json()) as ApiErrorResponse;
    } catch {
      errorResponse = {
        code: response.status,
        message: `Request failed with status ${response.status}`,
        data: {
          errorCode: '',
          detail: '',
          instance: '',
          errors: null,
        },
      };
    }
    const apiError = new ApiError(errorResponse);
    captureApiError(apiError);
    throw apiError;
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const json = (await response.json()) as { data: TResponse };
  return json.data;
}
