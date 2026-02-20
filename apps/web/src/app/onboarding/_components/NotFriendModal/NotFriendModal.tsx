'use client';

import Modal from '@/components/popup/modal/Modal';
import * as S from './NotFriendModal.styles';
import TextButton from '@/components/buttons/textButton/TextButton';

interface NotFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export default function NotFriendModal({
  isOpen,
  onClose,
  onRetry,
}: NotFriendModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.Title>친구가 아닌가요?</S.Title>
        <S.Description>새로고침 이후 다시 시도해주세요</S.Description>
        <Modal.Footer>
          <S.ButtonWrapper>
            <TextButton text="돌아가기" onClick={onClose} />
            <TextButton text="다시 시도하기" variant={'negative'} onClick={onRetry} />
          </S.ButtonWrapper>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
