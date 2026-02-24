'use client';

import { useCallback, useRef } from 'react';
import { useGetMyPageSuspense } from '@repo/api-client';
import usePopup from '@/hooks/usePopup';
import ChevronRightIcon from '@/assets/images/chevronRight.svg';
import DdayEditModal from './DdayEditModal';
import * as S from './DdayBannerClient.styles';

export default function DdayBannerClient() {
  const { data } = useGetMyPageSuspense();
  const dday = data.coupledDay;
  const hasDday = dday !== null && dday !== undefined;
  const { isOpen, handleOpen, handleClose } = usePopup();
  const savedDateRef = useRef<string | null>(null);

  const handleSaved = useCallback((date: string) => {
    savedDateRef.current = date;
  }, []);

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
        {hasDday ? (
          <>
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
          </>
        ) : (
          <>
            <S.EmptyText>처음 만난 날이 언제인가요?</S.EmptyText>
            <S.ChevronIcon>
              <ChevronRightIcon width={22} height={22} />
            </S.ChevronIcon>
          </>
        )}
      </S.Wrapper>
      <DdayEditModal
        isOpen={isOpen}
        onClose={handleClose}
        coupledDay={dday}
        savedDate={savedDateRef.current}
        onSaved={handleSaved}
      />
    </>
  );
}
