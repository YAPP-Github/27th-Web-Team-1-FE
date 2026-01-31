'use client';

import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import * as S from './LocationPermissionModal.styles';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationPermissionModal = ({ isOpen, onClose }: LocationPermissionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>위치 권한 필요</S.Title>
          <S.Description>
            위치 권한이 차단되어 있어요.
            <br />
            브라우저 설정에서 위치 권한을 허용해 주세요.
          </S.Description>
        </S.TextWrapper>
        <Modal.Footer>
          <TextButton text="확인" onClick={onClose} style={{ flex: 1 }} />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default LocationPermissionModal;
