import { useState } from 'react';
import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import * as S from './DdayEditModal.styles';

interface DdayEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DdayEditModal({ isOpen, onClose }: DdayEditModalProps) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

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
    // TODO: API 연동 후 날짜 저장 로직 추가
    onClose();
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
          <TextButton text="취소" onClick={onClose} style={{ flex: 1 }} />
          <TextButton
            text="변경하기"
            variant="primary"
            onClick={handleConfirm}
            disabled={!isValidDate()}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
