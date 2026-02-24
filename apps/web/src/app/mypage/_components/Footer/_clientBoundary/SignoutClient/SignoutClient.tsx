'use client';

import { useRouter } from 'next/navigation';
import { useGetMyStatus } from '@repo/api-client';
import usePopup from '@/hooks/usePopup';
import Modal from '@/components/popup/modal/Modal';
import TextButton from '@/components/buttons/textButton/TextButton';
import { ROUTES } from '@/constants/routes';
import * as S from './SignoutClient.styles';

export default function SignoutClient() {
  const router = useRouter();
  const { data: coupleStatus, isLoading, isError } = useGetMyStatus();
  const { isOpen, handleOpen, handleClose } = usePopup();

  const handleClick = () => {
    if (isLoading || isError) return;

    if (coupleStatus?.isCoupled) {
      handleOpen();
    } else {
      router.push(ROUTES.SIGNOUT);
    }
  };

  return (
    <>
      <S.Button type="button" onClick={handleClick}>
        회원 탈퇴
      </S.Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <S.TextGroup>
            <S.Title>상대방과 연결되어 있어요</S.Title>
            <S.Description>
              회원 탈퇴를 위해선 먼저
              <br />
              상대방과의 연결을 끊어야 해요
            </S.Description>
          </S.TextGroup>
          <Modal.Footer>
            <TextButton text="돌아가기" onClick={handleClose} style={{ flex: 1 }} />
            <TextButton
              text="이동하기"
              variant="negative"
              onClick={() => router.push(ROUTES.DISCONNECT)}
              style={{ flex: 1 }}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
