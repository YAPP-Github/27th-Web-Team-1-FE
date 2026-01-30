'use client';

import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import * as S from './AlbumDeleteModal.styles';

interface AlbumDeleteModalProps {
  isOpen: boolean;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlbumDeleteModal = ({
  isOpen,
  isDeleting = false,
  onClose,
  onConfirm,
}: AlbumDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>앨범을 삭제할까요?</S.Title>
          <S.Description>앨범 안의 모든 사진이 사라지고, 복구할 수 없어요.</S.Description>
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

export default AlbumDeleteModal;
