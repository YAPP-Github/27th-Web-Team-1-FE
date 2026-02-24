'use client';

import { useLogout } from '@repo/api-client';
import usePopup from '@/hooks/usePopup';
import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import { ROUTES } from '@/constants/routes';
import * as S from './LogoutClient.styles';

export default function LogoutClient() {
  const { isOpen, handleOpen, handleClose } = usePopup();

  const { mutate: logout, isPending } = useLogout({
    mutation: {
      onSettled: () => {
        window.location.href = ROUTES.LOGIN;
      },
    },
  });

  return (
    <>
      <S.Button type="button" onClick={handleOpen}>
        로그아웃
      </S.Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <S.Title>로그아웃 할까요?</S.Title>
          <Modal.Footer>
            <TextButton
              text="돌아가기"
              onClick={handleClose}
              disabled={isPending}
              style={{ flex: 1 }}
            />
            <TextButton
              text="로그아웃"
              variant="negative"
              onClick={logout}
              disabled={isPending}
              style={{ flex: 1 }}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
