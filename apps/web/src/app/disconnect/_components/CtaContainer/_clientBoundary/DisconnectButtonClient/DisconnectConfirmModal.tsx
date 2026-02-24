'use client';

import { useState, useEffect } from 'react';
import { useDisconnect, saveCoupleStatusCookie } from '@repo/api-client';
import Modal from '@/components/popup/modal/Modal';
import Input from '@/components/input/Input';
import TextButton from '@/components/buttons/textButton/TextButton';
import { useToast } from '@/components/toast';
import { ROUTES } from '@/constants/routes';
import * as S from './DisconnectButtonClient.styles';

const CONFIRM_TEXT = '연결을 끊을게요';

interface DisconnectConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisconnectConfirmModal({
  isOpen,
  onClose,
}: DisconnectConfirmModalProps) {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState('');

  const { mutate: disconnect, isPending } = useDisconnect({
    mutation: {
      onSuccess: async () => {
        await saveCoupleStatusCookie().catch(() => {});
        onClose();
        window.location.href = ROUTES.HOME;
      },
      onError: () => {
        onClose();
        showToast('연결 끊기에 실패했어요', 3000, 'warn');
      },
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  const isConfirmDisabled = isPending || inputValue !== CONFIRM_TEXT;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.Description>아래 문구를 정확하게 입력해주세요</S.Description>
        <S.ConfirmText>{CONFIRM_TEXT}</S.ConfirmText>
        <S.InputSection>
          <Input
            value={inputValue}
            onChange={setInputValue}
            placeholder="여기에 입력해주세요"
            showCharCount={false}
          />
        </S.InputSection>
        <Modal.Footer>
          <TextButton
            text="취소"
            onClick={onClose}
            disabled={isPending}
            style={{ flex: 1 }}
          />
          <TextButton
            text="연결 끊기"
            variant="negative"
            onClick={() => disconnect()}
            disabled={isConfirmDisabled}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
