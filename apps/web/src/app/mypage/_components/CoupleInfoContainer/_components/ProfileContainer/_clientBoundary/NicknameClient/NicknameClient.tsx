'use client';

import { useGetMyPageSuspense } from '@repo/api-client';
import usePopup from '@/hooks/usePopup';
import EditIcon from '@/assets/images/edit.svg';
import NicknameEditModal from './NicknameEditModal';
import * as S from './NicknameClient.styles';

export default function NicknameClient() {
  const { data } = useGetMyPageSuspense();
  const username = data.myName;
  const { isOpen, handleOpen, handleClose } = usePopup();

  return (
    <>
      <S.Wrapper
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <S.Text>{username ?? ''}</S.Text>
        <S.EditIcon>
          <EditIcon width={12} height={12} />
        </S.EditIcon>
      </S.Wrapper>
      <NicknameEditModal
        isOpen={isOpen}
        onClose={handleClose}
        initialNickname={username ?? ''}
      />
    </>
  );
}
