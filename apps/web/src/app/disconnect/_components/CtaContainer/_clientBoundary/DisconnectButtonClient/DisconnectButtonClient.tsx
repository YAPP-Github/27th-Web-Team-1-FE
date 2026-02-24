'use client';

import Button from '@/components/buttons/button/Button';
import usePopup from '@/hooks/usePopup';
import { useDisconnectContext } from '@/app/disconnect/_contexts/DisconnectContext';
import DisconnectConfirmModal from './DisconnectConfirmModal';

export default function DisconnectButtonClient() {
  const { isSubmitEnabled } = useDisconnectContext();
  const { isOpen, handleOpen, handleClose } = usePopup();

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
      <DisconnectConfirmModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
