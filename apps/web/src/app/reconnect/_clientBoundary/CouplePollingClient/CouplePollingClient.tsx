'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getMyStatus } from '@repo/api-client';
import { useToast } from '@/components/toast';
import { ROUTES } from '@/constants/routes';

const POLLING_INTERVAL = 3000;

export default function CouplePollingClient() {
  const router = useRouter();
  const { showToast } = useToast();
  const previousCoupledRef = useRef(false);

  useEffect(() => {
    const checkCoupleStatus = async () => {
      try {
        const data = await getMyStatus();
        const isCoupled = data.isCoupled ?? false;

        if (previousCoupledRef.current === false && isCoupled === true) {
          showToast('파트너와 다시 연결되었어요!', 3000, 'success');
          router.push(ROUTES.MYPAGE);
        }
        previousCoupledRef.current = isCoupled;
      } catch (error) {
        console.error('[ReconnectPage] 커플 상태 확인 실패:', error);
      }
    };

    checkCoupleStatus();
    const interval = setInterval(checkCoupleStatus, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [router, showToast]);

  return null;
}
