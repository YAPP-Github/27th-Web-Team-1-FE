'use client';

import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import * as S from './LocationPermissionModal.styles';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
}

const LocationPermissionModal = ({
  isOpen,
  onClose,
  onAllow,
}: LocationPermissionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>위치 정보 사용</S.Title>
          <S.Description>
            내 위치 기반으로 지도를 보여드려요.
            <br />
            위치 정보 사용을 허용해 주세요.
          </S.Description>
        </S.TextWrapper>
        <Modal.Footer>
          <TextButton text="다음에" onClick={onClose} style={{ flex: 1 }} />
          <TextButton
            text="허용하기"
            variant="primary"
            onClick={onAllow}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default LocationPermissionModal;
