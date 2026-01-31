'use client';

import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import Input from '@/components/input/Input';
import * as S from './AlbumAddModal.styles';

interface AlbumAddModalProps {
  isOpen: boolean;
  albumName: string;
  onChangeAlbumName: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  isCreating?: boolean;
}

const AlbumAddModal = ({
  isOpen,
  albumName,
  onChangeAlbumName,
  onClose,
  onConfirm,
  isCreating = false,
}: AlbumAddModalProps) => {
  const isSubmitDisabled = isCreating || !albumName.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>앨범 추가</S.Title>
        </S.TextWrapper>
        <S.InputSection>
          <Input
            value={albumName}
            onChange={onChangeAlbumName}
            placeholder="앨범명을 입력하세요"
            max={10}
          />
        </S.InputSection>
        <Modal.Footer>
          <TextButton
            text="취소"
            onClick={onClose}
            disabled={isCreating}
            style={{ flex: 1 }}
          />
          <TextButton
            text="추가하기"
            variant="primary"
            onClick={onConfirm}
            disabled={isSubmitDisabled}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AlbumAddModal;
