'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveCoupleStatusCookie } from '@repo/api-client';
import { COUPLE_STATUS_COOKIE } from '@/constants/cookie';

function getCookieValue(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1];
}

export default function CoupleStatusSyncClient() {
  const router = useRouter();

  useEffect(() => {
    const syncCookie = async () => {
      const before = getCookieValue(COUPLE_STATUS_COOKIE);

      try {
        await saveCoupleStatusCookie();
      } catch (error) {
        console.error('[CoupleStatusSyncClient] sync failed:', error);
        return;
      }

      const after = getCookieValue(COUPLE_STATUS_COOKIE);
      if (before !== after) {
        router.refresh();
      }
    };

    void syncCookie();
  }, [router]);

  return null;
}
