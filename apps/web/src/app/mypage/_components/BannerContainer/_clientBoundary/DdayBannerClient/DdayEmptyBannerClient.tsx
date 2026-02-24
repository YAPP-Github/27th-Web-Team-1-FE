'use client';

import { useGetMyPageSuspense } from '@repo/api-client';
import usePopup from '@/hooks/usePopup';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import DdayEditModal from './DdayEditModal';
import * as S from './DdayBannerClient.styles';

export default function DdayEmptyBannerClient() {
  const { data } = useGetMyPageSuspense();
  const { isOpen, handleOpen, handleClose } = usePopup();

  if (data.coupledDay != null) return null;

  return (
    <>
      <S.Wrapper
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <S.EmptyText>처음 만난 날이 언제인가요?</S.EmptyText>
        <S.ChevronIcon>
          <ChevronRightIcon width={22} height={22} />
        </S.ChevronIcon>
      </S.Wrapper>
      <DdayEditModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
