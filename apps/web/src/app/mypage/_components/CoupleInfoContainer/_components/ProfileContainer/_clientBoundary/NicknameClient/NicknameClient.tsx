'use client';

import { useState } from 'react';
import {
  useUpdateNickname,
  useGetMyPageSuspense,
  getGetMyPageQueryKey,
  type MyPageResponse,
} from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';
import usePopup from '@/hooks/usePopup';
import Modal from '@/components/popup/modal/Modal';
import Input from '@/components/input/Input';
import TextButton from '@/components/buttons/textButton/TextButton';
import EditIcon from '@/assets/images/edit.svg';
import * as S from './NicknameClient.styles';
import * as ModalS from './NicknameEditModal.styles';

export default function NicknameClient() {
  const { data } = useGetMyPageSuspense();
  const username = data.myName;
  const [nickname, setNickname] = useState('');
  const { isOpen, handleOpen, handleClose } = usePopup();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate: updateNickname, isPending } = useUpdateNickname();

  const handleNicknameEdit = () => {
    setNickname(username ?? '');

    handleOpen();
  };

  const handleConfirm = () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    const queryKey = getGetMyPageQueryKey();
    const previousData = queryClient.getQueryData<MyPageResponse>(queryKey);

    queryClient.setQueryData<MyPageResponse>(queryKey, (old) =>
      old ? { ...old, myName: trimmed } : old,
    );

    updateNickname(
      { data: { nickname: trimmed } },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: () => {
          queryClient.setQueryData(queryKey, previousData);
          showToast('닉네임 변경에 실패했어요');
        },
      },
    );
  };

  const isSubmitDisabled = isPending || !nickname.trim();

  return (
    <>
      <S.Wrapper
        role="button"
        tabIndex={0}
        onClick={handleNicknameEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNicknameEdit();
          }
        }}
      >
        <S.Text>{username ?? ''}</S.Text>
        <S.EditIcon>
          <EditIcon width={12} height={12} />
        </S.EditIcon>
      </S.Wrapper>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <ModalS.TextWrapper>
            <ModalS.Title>변경할 닉네임을 입력해주세요</ModalS.Title>
          </ModalS.TextWrapper>
          <ModalS.InputSection>
            <Input
              value={nickname}
              onChange={setNickname}
              placeholder="닉네임을 입력하세요"
              max={10}
            />
          </ModalS.InputSection>
          <Modal.Footer>
            <TextButton
              text="취소"
              onClick={handleClose}
              disabled={isPending}
              style={{ flex: 1 }}
            />
            <TextButton
              text="변경하기"
              variant="primary"
              onClick={handleConfirm}
              disabled={isSubmitDisabled}
              style={{ flex: 1 }}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
