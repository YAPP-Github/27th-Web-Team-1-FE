'use client';

import { useGetMyPageSuspense } from '@repo/api-client';
import usePopup from '@/hooks/usePopup';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import DdayEditModal from './DdayEditModal';
import * as S from './DdayBannerClient.styles';

export default function DdayBannerClient() {
  const { data } = useGetMyPageSuspense();
  const dday = data.coupledDay ?? 0;
  const { isOpen, handleOpen, handleClose } = usePopup();

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
        <S.Content>
          <S.Caption>처음 만난 날부터</S.Caption>
          <S.DdayRow>
            <S.DdayPrefix>D+</S.DdayPrefix>
            <S.DdayNumber>{dday}</S.DdayNumber>
          </S.DdayRow>
        </S.Content>
        <S.ChevronIcon>
          <ChevronRightIcon width={22} height={22} />
        </S.ChevronIcon>
      </S.Wrapper>
      <DdayEditModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
