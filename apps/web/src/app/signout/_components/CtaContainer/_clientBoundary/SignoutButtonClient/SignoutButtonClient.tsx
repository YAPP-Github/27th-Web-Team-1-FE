'use client';

import { useWithdraw, ApiError } from '@repo/api-client';
import Button from '@/components/buttons/button/Button';
import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import usePopup from '@/hooks/usePopup';
import { useToast } from '@/components/toast/ToastProvider';
import { useSignoutContext } from '@/app/signout/_contexts/SignoutContext';
import { ROUTES } from '@/constants/routes';
import * as S from './SignoutButtonClient.styles';

export default function SignoutButtonClient() {
  const { isSubmitEnabled } = useSignoutContext();
  const { isOpen, handleOpen, handleClose } = usePopup();
  const { showToast } = useToast();

  const { mutate: withdraw, isPending } = useWithdraw({
    mutation: {
      onSuccess: () => {
        window.location.href = ROUTES.LOGIN;
      },
      onError: (error) => {
        handleClose();
        const message =
          error instanceof ApiError && error.detail
            ? error.detail
            : '회원 탈퇴에 실패했어요.';
        showToast(message, 3000, 'warn');
      },
    },
  });

  return (
    <>
      <Button
        text="로킷 탈퇴하기"
        onClick={handleOpen}
        size="large"
        variant="danger"
        disabled={!isSubmitEnabled}
        style={{ width: '100%' }}
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <S.Title>정말 탈퇴하시겠어요?</S.Title>
          <Modal.Footer>
            <TextButton
              text="돌아가기"
              onClick={handleClose}
              disabled={isPending}
              style={{ flex: 1 }}
            />
            <TextButton
              text="탈퇴하기"
              variant="negative"
              onClick={() => withdraw()}
              disabled={isPending}
              style={{ flex: 1 }}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
