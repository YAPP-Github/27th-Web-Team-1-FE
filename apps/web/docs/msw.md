# MSW (Mock Service Worker) 사용 가이드

## 개요

MSW는 Service Worker를 사용하여 네트워크 요청을 가로채고 모킹하는 라이브러리입니다.
브라우저와 Node.js(테스트) 환경 모두에서 동일한 핸들러를 사용할 수 있습니다.

## 실행 방법

### 브라우저에서 MSW 활성화

```bash
# 루트에서 실행
pnpm --filter web dev:mock

# 또는 apps/web 디렉토리에서
pnpm dev:mock
```

또는 `.env.local` 파일을 생성하여 설정:

```bash
# apps/web/.env.local
NEXT_PUBLIC_ENABLE_MSW=true
```

```bash
pnpm dev
```

### 테스트에서 MSW 사용

테스트 환경에서는 자동으로 MSW가 활성화됩니다:

```bash
pnpm --filter web test
```

## 핸들러 작성법

### 기본 핸들러 (orval 자동생성)

`@repo/api-client`의 orval 설정에 의해 자동 생성된 핸들러를 사용합니다:

```typescript
// apps/web/src/mocks/handlers.ts
import { getGetGreetingMockHandler } from '@repo/api-client';

export const handlers = [getGetGreetingMockHandler()];
```

### 커스텀 핸들러 추가

```typescript
// apps/web/src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { getGetGreetingMockHandler } from '@repo/api-client';

export const handlers = [
  getGetGreetingMockHandler(),

  // 커스텀 핸들러
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  }),
];
```

### 테스트에서 핸들러 오버라이드

```typescript
import { server } from '@/tests/msw-server';
import { http, HttpResponse } from 'msw';

describe('MyComponent', () => {
  beforeEach(() => {
    server.use(
      http.get('*/greeting', () => HttpResponse.json({ message: 'Test message' })),
    );
  });

  it('renders greeting', async () => {
    // ...
  });
});
```

## 파일 구조

```
apps/web/
├── public/
│   └── mockServiceWorker.js  # MSW Service Worker (자동 생성)
├── src/
│   ├── mocks/
│   │   ├── browser.ts        # 브라우저용 worker 설정
│   │   ├── handlers.ts       # API 핸들러 정의
│   │   ├── MSWProvider.tsx   # React Provider 컴포넌트
│   │   └── index.ts          # exports
│   └── tests/
│       ├── msw-server.ts     # Node.js용 server 설정 (테스트)
│       └── setupTests.ts     # 테스트 설정
```

## 환경변수

| 변수명                     | 설명                 | 기본값  |
| -------------------------- | -------------------- | ------- |
| `NEXT_PUBLIC_ENABLE_MOCK`  | 브라우저 모킹 활성화 | `false` |
| `NEXT_PUBLIC_API_BASE_URL` | API Base URL         | ``      |

## 주의사항

1. **프로덕션 빌드**: `NEXT_PUBLIC_ENABLE_MOCK`가 `true`여도 `NODE_ENV=production`이면 MSW가 활성화되지 않습니다.

2. **Service Worker 재생성**: MSW 버전 업데이트 시 재생성이 필요합니다:

   ```bash
   pnpm msw init public --save
   ```

3. **핸들러 패턴**: 상대 경로(`/greeting`)와 절대 경로(`*/greeting`) 모두 지원됩니다.

## 디버깅

브라우저 콘솔에서 MSW 로그를 확인할 수 있습니다:

```
[MSW] Mocking enabled.
[MSW] 12:34:56 GET /greeting (200 OK)
```

처리되지 않은 요청은 `onUnhandledRequest: 'bypass'` 설정으로 실제 네트워크로 전달됩니다.
