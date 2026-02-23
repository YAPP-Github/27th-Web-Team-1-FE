'use client';

import { useState } from 'react';
import usePopup from '@/hooks/usePopup';
import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import { logout } from '@/auth/cookies';
import * as S from './LogoutClient.styles';

export default function LogoutClient() {
  const { isOpen, handleOpen, handleClose } = usePopup();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
  };

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
              disabled={isLoading}
              style={{ flex: 1 }}
            />
            <TextButton
              text="로그아웃"
              variant="negative"
              onClick={handleLogout}
              disabled={isLoading}
              style={{ flex: 1 }}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
