'use client';

import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import Input from '@/components/input/Input';
import * as S from './AlbumRenameModal.styles';

interface AlbumRenameModalProps {
  isOpen: boolean;
  albumName: string;
  onChangeAlbumName: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  isUpdating?: boolean;
}

const AlbumRenameModal = ({
  isOpen,
  albumName,
  onChangeAlbumName,
  onClose,
  onConfirm,
  isUpdating = false,
}: AlbumRenameModalProps) => {
  const isSubmitDisabled = isUpdating || !albumName.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>앨범 이름 변경</S.Title>
        </S.TextWrapper>
        <S.InputSection>
          <Input
            value={albumName}
            onChange={onChangeAlbumName}
            placeholder="변경할 앨범명을 입력해주세요"
            max={10}
          />
        </S.InputSection>
        <Modal.Footer>
          <TextButton
            text="취소"
            onClick={onClose}
            disabled={isUpdating}
            style={{ flex: 1 }}
          />
          <TextButton
            text="변경하기"
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

export default AlbumRenameModal;
