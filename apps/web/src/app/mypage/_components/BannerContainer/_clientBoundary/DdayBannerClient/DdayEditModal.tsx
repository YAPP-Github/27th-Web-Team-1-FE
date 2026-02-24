import { useState, useEffect } from 'react';
import {
  useUpdateFirstMetDate,
  getGetMyPageQueryKey,
  type MyPageResponse,
} from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';
import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import * as S from './DdayEditModal.styles';

interface DdayEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
}

export default function DdayEditModal({
  isOpen,
  onClose,
  initialDate,
}: DdayEditModalProps) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate: updateFirstMetDate, isPending } = useUpdateFirstMetDate();

  useEffect(() => {
    if (isOpen && initialDate) {
      const [y, m, d] = initialDate.split('-');
      setYear(y);
      setMonth(String(Number(m)));
      setDay(String(Number(d)));
    }
  }, [isOpen, initialDate]);

  const isValidDate = () => {
    if (!year || !month || !day) return false;

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    if (y < 1900 || y > new Date().getFullYear()) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > new Date(y, m, 0).getDate()) return false;

    const date = new Date(y, m - 1, d);
    if (date > new Date()) return false;

    return true;
  };

  const handleConfirm = () => {
    if (!isValidDate()) return;

    const firstMetDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const queryKey = getGetMyPageQueryKey();

    const today = new Date();
    const met = new Date(Number(year), Number(month) - 1, Number(day));
    const diffDays =
      Math.floor((today.getTime() - met.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData<MyPageResponse>(queryKey);
    queryClient.setQueryData<MyPageResponse>(queryKey, (old) =>
      old ? { ...old, coupledDay: diffDays, firstMetDate } : old,
    );

    updateFirstMetDate(
      { data: { firstMetDate } },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          queryClient.setQueryData(queryKey, previousData);
          showToast('날짜 변경에 실패했어요');
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey });
        },
      },
    );
  };

  const handleNumericChange =
    (setter: (value: string) => void, maxLength: number, max?: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
      if (value && max && Number(value) > max) return;
      setter(value);
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>처음 만난 날짜를 입력하세요</S.Title>
        </S.TextWrapper>
        <S.DateInputRow>
          <S.DateBlock>
            <S.DateInput
              type="text"
              inputMode="numeric"
              placeholder="2025"
              value={year}
              $charCount={year.length || 4}
              onChange={handleNumericChange(setYear, 4, new Date().getFullYear())}
            />
            <S.DateSuffix $isEmpty={!year}>년</S.DateSuffix>
          </S.DateBlock>
          <S.DateBlock>
            <S.DateInput
              type="text"
              inputMode="numeric"
              placeholder="12"
              value={month}
              $charCount={month.length || 2}
              onChange={handleNumericChange(setMonth, 2, 12)}
            />
            <S.DateSuffix $isEmpty={!month}>월</S.DateSuffix>
          </S.DateBlock>
          <S.DateBlock>
            <S.DateInput
              type="text"
              inputMode="numeric"
              placeholder="17"
              value={day}
              $charCount={day.length || 2}
              onChange={handleNumericChange(setDay, 2, 31)}
            />
            <S.DateSuffix $isEmpty={!day}>일</S.DateSuffix>
          </S.DateBlock>
        </S.DateInputRow>
        <Modal.Footer>
          <TextButton
            text="취소"
            onClick={onClose}
            disabled={isPending}
            style={{ flex: 1 }}
          />
          <TextButton
            text="변경하기"
            variant="primary"
            onClick={handleConfirm}
            disabled={!isValidDate() || isPending}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
