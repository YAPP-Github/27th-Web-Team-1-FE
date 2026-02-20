'use client';

import { useRouter } from 'next/navigation';
import CircleButton from '@/components/buttons/circleButton/CircleButton';
import ChevronLeftSvg from '@/assets/images/chevronLeft.svg';
import * as S from './OnboardingHeader.styles';

interface OnboardingHeaderProps {
  /** 뒤로가기 버튼 표시 여부 */
  showBackButton?: boolean;
}

const OnboardingHeader = ({ showBackButton = true }: OnboardingHeaderProps) => {
  const router = useRouter();

  return (
    <S.Header>
      {showBackButton && (
        <CircleButton onClick={() => router.back()} aria-label="뒤로가기">
          <ChevronLeftSvg />
        </CircleButton>
      )}
    </S.Header>
  );
};

export default OnboardingHeader;
