'use client';

import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import * as S from './DeleteConfirmModal.styles';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>사진을 삭제할까요?</S.Title>
          <S.Description>한 번 삭제한 사진은 되돌릴 수 없어요.</S.Description>
        </S.TextWrapper>
        <Modal.Footer>
          <TextButton
            text="취소"
            onClick={onClose}
            disabled={isDeleting}
            style={{ flex: 1 }}
          />
          <TextButton
            text="삭제하기"
            variant="negative"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteConfirmModal;
