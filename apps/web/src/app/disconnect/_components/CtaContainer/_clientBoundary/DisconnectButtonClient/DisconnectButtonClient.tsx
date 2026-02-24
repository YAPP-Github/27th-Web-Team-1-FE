'use client';

import Button from '@/components/buttons/button/Button';
import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import usePopup from '@/hooks/usePopup';
import { useDisconnectContext } from '@/app/disconnect/_contexts/DisconnectContext';
import * as S from './DisconnectButtonClient.styles';

export default function DisconnectButtonClient() {
  const { isSubmitEnabled } = useDisconnectContext();
  const { isOpen, handleOpen, handleClose } = usePopup();

  const handleDisconnect = () => {
    // TODO: 연결 끊기 mutation 구현
    handleClose();
  };

  return (
    <>
      <Button
        text="연결 끊기"
        onClick={handleOpen}
        size="large"
        variant="danger"
        disabled={!isSubmitEnabled}
        style={{ width: '100%' }}
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <S.Title>정말 연결을 끊으시겠어요?</S.Title>
          <Modal.Footer>
            <TextButton text="돌아가기" onClick={handleClose} style={{ flex: 1 }} />
            <TextButton
              text="연결 끊기"
              variant="negative"
              onClick={handleDisconnect}
              style={{ flex: 1 }}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
