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

export async function customFetcher<TResponse>(
  config: FetcherConfig,
  options: RequestInit = {},
): Promise<TResponse> {
  const baseUrl = resolveBaseUrl();
  const baseTargetUrl = joinUrl(config.url, baseUrl);
  const urlWithPath = buildUrlWithPathParams(baseTargetUrl, config.pathParams);
  const targetUrl = buildUrlWithQueryParams(urlWithPath, config.params);
  const body = config.body ?? config.data;

  const response = await fetch(targetUrl, {
    method: config.method,
    body: body ? JSON.stringify(body) : undefined,
    signal: config.signal,
    headers: {
      ...DEFAULT_HEADERS,
      ...(config.headers ?? {}),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request to ${targetUrl} failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}
