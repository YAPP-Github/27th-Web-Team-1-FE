'use client';

import { useEffect, useRef } from 'react';

const ON_MSW_ENABLED = 'on-msw-enabled';

let isMockEnabled = false;

/**
 * 브라우저에서 mock server 활성화를 위한 컴포넌트
 * - children을 blocking하지 않고, fetch 요청을 큐잉하여 race condition 방지
 */
export function EnableMockClient() {
  const isEffectCalled = useRef(false);

  useEffect(() => {
    if (isEffectCalled.current) return;
    isEffectCalled.current = true;

    if (process.env.NEXT_PUBLIC_ENABLE_MOCK !== 'true') return;

    const originalFetch = window.fetch.bind(window);

    window.fetch = async (...args) => {
      if (isMockEnabled) {
        return originalFetch(...args);
      }

      await new Promise<void>((resolve) => {
        window.addEventListener(ON_MSW_ENABLED, () => resolve(), { once: true });
      });

      return originalFetch(...args);
    };

    (async () => {
      const { worker } = await import('./browser');

      await worker.start({ onUnhandledRequest: 'bypass' });

      isMockEnabled = true;
      window.dispatchEvent(new CustomEvent(ON_MSW_ENABLED));
    })();
  }, []);

  return null;
}
