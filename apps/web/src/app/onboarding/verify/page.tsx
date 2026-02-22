'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/buttons/button/Button';
import CodeInput from '../_components/CodeInput/CodeInput';
import OnboardingHeader from '../_components/OnboardingHeader/OnboardingHeader';
import NotFriendModal from '../_components/NotFriendModal/NotFriendModal';
import { useCodeVerification } from '../_hooks/useCodeVerification';
import { useOnboardingContext } from '../_contexts/OnboardingContext';
import { useToast } from '@/components/toast/ToastProvider';
import { ROUTES } from '@/constants/routes';
import { INVITE_CODE_LENGTH } from '@/constants/onboarding';
import DefaultProfile from '@/assets/images/defaultProfile.svg';
import * as S from './page.styles';

type VerifyState = 'input' | 'loading' | 'preConfirm';

export default function VerifyPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [state, setState] = useState<VerifyState>('input');
  const [code, setCode] = useState('');
  const [isNotFriendModalOpen, setIsNotFriendModalOpen] = useState(false);
  const [hasProfileImageError, setHasProfileImageError] = useState(false);
  const { verifiedPartner, setVerifiedPartner, markStepCompleted } =
    useOnboardingContext();
  const { verifyCode, joinCode, isJoining } = useCodeVerification();

  // 뒤로가기 시 재검증 방지
  const hasVerifiedRef = useRef(false);

  const handleRetry = useCallback(() => {
    setCode('');
    setState('input');
    setHasProfileImageError(false);
    hasVerifiedRef.current = false;
  }, []);

  const handleCodeComplete = useCallback(
    async (enteredCode: string) => {
      if (hasVerifiedRef.current) return;

      setState('loading');
      const result = await verifyCode(enteredCode);

      if (result.success && result.data) {
        setVerifiedPartner({
          userId: result.data.inviterUserId || 0,
          nickname: result.data.nickname || '',
          profileImageUrl: result.data.profileImageUrl || '',
        });
        setHasProfileImageError(false);
        setState('preConfirm');
        hasVerifiedRef.current = true;
      } else {
        const errorCode = result.errorCode;
        if (errorCode === 'INVITE_001') {
          showToast('잘못된 코드예요', 3000, 'warn');
        } else if (errorCode === 'INVITE_002') {
          showToast('만료된 코드예요', 3000, 'warn');
        } else if (errorCode === 'COUPLE_001') {
          showToast('이미 연결된 계정이에요', 3000, 'warn');
          setTimeout(() => router.push(ROUTES.HOME), 3000);
          return;
        } else {
          showToast('잘못된 코드예요', 3000, 'warn');
        }
        handleRetry();
      }
    },
    [verifyCode, setVerifiedPartner, showToast, handleRetry, router],
  );

  const handleConfirm = useCallback(async () => {
    const result = await joinCode(code);
    if (result.success) {
      markStepCompleted('verify');

      setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 1500);
    } else {
      showToast('잘못된 코드예요', 3000, 'warn');
      handleRetry();
    }
  }, [code, joinCode, markStepCompleted, router, showToast, handleRetry]);

  const handleNotFriendRetry = useCallback(() => {
    setIsNotFriendModalOpen(false);
    handleRetry();
  }, [handleRetry]);

  // 상태별 UI
  if (state === 'loading') {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <S.Spinner />
          <S.LoadingText>확인하는 중...</S.LoadingText>
        </S.LoadingWrapper>
      </S.Container>
    );
  }

  if (state === 'preConfirm' && verifiedPartner) {
    return (
      <>
        <S.Container>
          <OnboardingHeader />
          <S.Content>
            {!hasProfileImageError && verifiedPartner.profileImageUrl ? (
              <S.ProfileImage
                src={verifiedPartner.profileImageUrl}
                onError={() => setHasProfileImageError(true)}
                alt="파트너"
              />
            ) : (
              <DefaultProfile width={100} height={100} />
            )}
            <S.Question>{verifiedPartner.nickname}님과 함께할까요?</S.Question>
          </S.Content>
          <S.ButtonGroup>
            <S.UnderlineText onClick={() => setIsNotFriendModalOpen(true)}>
              친구가 아니에요
            </S.UnderlineText>
            <Button
              text="함께할래요!"
              variant="highlight"
              onClick={handleConfirm}
              disabled={isJoining}
            />
          </S.ButtonGroup>
        </S.Container>
        <NotFriendModal
          isOpen={isNotFriendModalOpen}
          onClose={() => setIsNotFriendModalOpen(false)}
          onRetry={handleNotFriendRetry}
        />
      </>
    );
  }

  // input 상태
  return (
    <S.Container>
      <OnboardingHeader />
      <S.Content>
        <S.Title>친구 코드 입력</S.Title>
        <S.Description>
          친구에게 받은 {INVITE_CODE_LENGTH}자리 코드를 입력하세요
        </S.Description>
        <CodeInput value={code} onChange={setCode} onComplete={handleCodeComplete} />
      </S.Content>

      <S.ButtonGroup>
        <Button
          text="확인"
          variant="highlight"
          onClick={() => handleCodeComplete(code)}
          disabled={code.length !== INVITE_CODE_LENGTH}
        />
      </S.ButtonGroup>
    </S.Container>
  );
}
