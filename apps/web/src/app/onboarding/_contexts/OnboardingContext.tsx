'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';

interface OnboardingStep {
  profile: boolean;
  connect: boolean;
  verify: boolean;
}

interface ProfileData {
  nickname: string;
  profileImageUrl: string | null;
}

interface InviteCodeData {
  code: string;
  expiresAt: string;
}

interface OnboardingContextValue {
  // 단계 완료 상태
  completedSteps: OnboardingStep;
  markStepCompleted: (step: keyof OnboardingStep) => void;

  // 프로필 데이터
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;

  // 초대 코드 데이터
  inviteCode: InviteCodeData | null;
  setInviteCode: (code: InviteCodeData | null) => void;

  // 검증된 파트너 정보
  verifiedPartner: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  } | null;
  setVerifiedPartner: (
    partner: {
      userId: number;
      nickname: string;
      profileImageUrl: string;
    } | null,
  ) => void;

  // 전체 초기화
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const initialProfileData: ProfileData = {
  nickname: '',
  profileImageUrl: null,
};

const initialCompletedSteps: OnboardingStep = {
  profile: false,
  connect: false,
  verify: false,
};

const STORAGE_KEY = 'onboarding_steps';

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] =
    useState<OnboardingStep>(initialCompletedSteps);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [inviteCode, setInviteCode] = useState<InviteCodeData | null>(null);
  const [verifiedPartner, setVerifiedPartner] = useState<{
    userId: number;
    nickname: string;
    profileImageUrl: string;
  } | null>(null);

  // 초기화 시 sessionStorage에서 복원
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(parsed);
      } catch (e) {
        console.error('Failed to parse onboarding steps from sessionStorage', e);
      }
    }
  }, []);

  // completedSteps 변경 시 저장
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
  }, [completedSteps]);

  const markStepCompleted = useCallback((step: keyof OnboardingStep) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: true }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setCompletedSteps(initialCompletedSteps);
    setProfileData(initialProfileData);
    setInviteCode(null);
    setVerifiedPartner(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      completedSteps,
      markStepCompleted,
      profileData,
      setProfileData,
      inviteCode,
      setInviteCode,
      verifiedPartner,
      setVerifiedPartner,
      resetOnboarding,
    }),
    [
      completedSteps,
      markStepCompleted,
      profileData,
      inviteCode,
      verifiedPartner,
      resetOnboarding,
    ],
  );

  return (
    <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within OnboardingProvider');
  }
  return context;
}
