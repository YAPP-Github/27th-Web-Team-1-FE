'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getMyStatus } from '@repo/api-client';
import { useReconnectInviteCode } from '../../_hooks/useReconnectInviteCode';
import { useToast } from '@/components/toast';
import { ROUTES } from '@/constants/routes';
import CopySvg from '@/assets/images/copy.svg';
import * as S from './InviteCodeClient.styles';

const COUPLE_STATUS_POLLING_INTERVAL = 3000;

export default function InviteCodeClient() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isCoupled, setIsCoupled] = useState(false);
  const [expiryTime, setExpiryTime] = useState('');
  const previousCoupledRef = useRef(false);
  const previousCodeRef = useRef<string | null>(null);
  const { inviteCode, createCode, copyCode } = useReconnectInviteCode();

  // 3초마다 coupled 상태 확인
  useEffect(() => {
    const checkCoupleStatus = async () => {
      try {
        const data = await getMyStatus();
        setIsCoupled(data.isCoupled ?? false);
      } catch (error) {
        console.error('연결 상태 확인 실패:', error);
      }
    };

    checkCoupleStatus();
    const interval = setInterval(checkCoupleStatus, COUPLE_STATUS_POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // coupled 상태 변경 감지 - false에서 true로 변경되면 토스트 표시 + HOME 이동
  useEffect(() => {
    if (previousCoupledRef.current === false && isCoupled === true) {
      showToast('파트너와 다시 연결되었어요!', 3000, 'success');
      router.push(ROUTES.HOME);
    }
    previousCoupledRef.current = isCoupled;
  }, [isCoupled, showToast, router]);

  // inviteCode 변경 감지 - 코드가 자동으로 갱신되었을 때 토스트 표시
  useEffect(() => {
    if (previousCodeRef.current && previousCodeRef.current !== inviteCode?.code) {
      showToast('초대코드가 변경되었어요', 3000, 'warn');
    }
    previousCodeRef.current = inviteCode?.code || null;
  }, [inviteCode?.code, showToast]);

  // 페이지 진입 시 코드 생성
  useEffect(() => {
    createCode();
  }, [createCode]);

  // 남은 시간 계산 및 업데이트
  useEffect(() => {
    if (!inviteCode?.expiresAt) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const expiryDate = new Date(inviteCode.expiresAt);
      const timeLeft = expiryDate.getTime() - now.getTime();

      if (timeLeft <= 0) {
        setExpiryTime('만료되었어요');
        return;
      }

      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setExpiryTime(`${timeString} 뒤 만료되어요`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [inviteCode?.expiresAt]);

  return (
    <>
      <S.CodeDisplay>
        <span>{inviteCode?.code || '000000'}</span>
        <S.CopyIconButton onClick={copyCode} aria-label="복사">
          <CopySvg />
        </S.CopyIconButton>
      </S.CodeDisplay>
      {expiryTime && <S.ExpiryText>{expiryTime}</S.ExpiryText>}
    </>
  );
}
