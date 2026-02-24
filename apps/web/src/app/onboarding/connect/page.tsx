'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getMyStatus } from '@repo/api-client';
import Button from '@/components/buttons/button/Button';
import OnboardingHeader from '../_components/OnboardingHeader/OnboardingHeader';
import { useInviteCode } from '../_hooks/useInviteCode';
import { useOnboardingContext } from '../_contexts/OnboardingContext';
import { useToast } from '@/components/toast';
import { ROUTES } from '@/constants/routes';
import { KAKAO_TEMPLATE_ID } from '@/constants/kakao';
import CopySvg from '@/assets/images/copy.svg';
import * as S from './page.styles';
import KakaoSvg from '@/assets/images/kakao.svg';

const COUPLE_STATUS_POLLING_INTERVAL = 3000;

export default function ConnectPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isCoupled, setIsCoupled] = useState(false);
  const [expiryTime, setExpiryTime] = useState('');
  const previousCoupledRef = useRef(false);
  const previousCodeRef = useRef<string | null>(null);
  const { markStepCompleted, profileData } = useOnboardingContext();
  const { inviteCode, createCode, refreshCode, copyCode, isLoading } = useInviteCode();

  // 5초마다 coupled 상태 확인
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

  // coupled 상태 변경 감지 - false에서 true로 변경되면 토스트 표시
  useEffect(() => {
    if (previousCoupledRef.current === false && isCoupled === true) {
      showToast('이제 시작할 수 있어요!', 3000, 'success');
    }
    previousCoupledRef.current = isCoupled;
  }, [isCoupled, showToast]);

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

  const handleStartClick = useCallback(() => {
    if (!isCoupled) {
      showToast('파트너가 접속하면 로킷을 사용할 수 있어요', 3000, 'info');
      return;
    }
    markStepCompleted('connect');
    router.push(ROUTES.HOME);
  }, [isCoupled, markStepCompleted, router, showToast]);

  const handleInputCodeClick = useCallback(() => {
    markStepCompleted('connect');
    router.push(ROUTES.ONBOARDING.VERIFY);
  }, [markStepCompleted, router]);

  const handleShareKakao = useCallback(() => {
    const kakao = window.Kakao;
    if (kakao && inviteCode?.code) {
      try {
        const isDev = process.env.NODE_ENV === 'development';
        const templateId = isDev ? KAKAO_TEMPLATE_ID.DEV : KAKAO_TEMPLATE_ID.PROD;

        if (!templateId) {
          console.error('카카오톡 템플릿 ID가 설정되지 않았습니다.');
          return;
        }

        kakao.Share.sendCustom({
          templateId: templateId,
          templateArgs: {
            userName: profileData.nickname || '사용자',
            inviteCode: inviteCode.code || '000000',
            link: window.location.origin,
          },
        });
      } catch (error) {
        console.error('카카오톡 공유 실패:', error);
      }
    }
  }, [inviteCode?.code, profileData.nickname]);

  return (
    <S.Wrapper>
      <OnboardingHeader />
      <S.Content>
        <S.Title>함께 사진을 채워봐요</S.Title>
        <S.Description>로킷을 함께 즐길 친구를 초대하세요</S.Description>

        <S.CodeSection>
          <S.SectionTitle>내 초대 코드</S.SectionTitle>
          <S.CodeDisplay>
            <span>{inviteCode?.code || '000000'}</span>
            <S.CopyIconButton onClick={copyCode} aria-label="복사">
              <CopySvg />
            </S.CopyIconButton>
          </S.CodeDisplay>
          {expiryTime && <S.ExpiryText>{expiryTime}</S.ExpiryText>}
        </S.CodeSection>
        <S.KakaoShareButton onClick={handleShareKakao}>
          <S.KakaoIcon>
            <KakaoSvg />
          </S.KakaoIcon>
          카카오톡으로 공유하기
        </S.KakaoShareButton>
      </S.Content>

      <S.ButtonGroup>
        <S.SignOutButton onClick={() => router.push(ROUTES.SIGNOUT)}>
          회원탈퇴 하기
        </S.SignOutButton>
        <S.ButtonRow>
          <Button
            text="초대코드 입력"
            variant="secondary"
            onClick={handleInputCodeClick}
          />
          <S.StartButtonWrapper isDisabled={!isCoupled} onClick={handleStartClick}>
            <Button
              text="시작하기"
              variant="highlight"
              onClick={() => {}}
              disabled={!isCoupled}
            />
          </S.StartButtonWrapper>
        </S.ButtonRow>
      </S.ButtonGroup>
    </S.Wrapper>
  );
}
