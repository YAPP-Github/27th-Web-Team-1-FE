'use client';

import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import Textarea from '@/components/textarea/Textarea';
import * as S from './MemoModal.styles';

const MAX_MEMO_LENGTH = 50;

interface MemoModalProps {
  isOpen: boolean;
  tempMemo: string;
  onChangeTempMemo: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const MemoModal = ({
  isOpen,
  tempMemo,
  onChangeTempMemo,
  onClose,
  onSubmit,
}: MemoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.Title>메모 추가</S.Title>
        <Textarea
          value={tempMemo}
          onChange={onChangeTempMemo}
          max={MAX_MEMO_LENGTH}
          placeholder="텍스트를 입력해주세요"
          autoFocus
        />
        <Modal.Footer>
          <TextButton text="취소" onClick={onClose} style={{ flex: 1 }} />
          <TextButton
            text="추가하기"
            variant="primary"
            onClick={onSubmit}
            disabled={!tempMemo.trim()}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default MemoModal;
