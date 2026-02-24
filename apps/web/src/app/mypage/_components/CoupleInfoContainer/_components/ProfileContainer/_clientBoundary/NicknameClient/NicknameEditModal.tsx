import { useState } from 'react';
import {
  useUpdateNickname,
  getGetMyPageQueryKey,
  type MyPageResponse,
} from '@repo/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/toast';
import Modal from '@/components/popup/modal/Modal';
import Input from '@/components/input/Input';
import TextButton from '@/components/buttons/textButton/TextButton';
import * as S from './NicknameEditModal.styles';

interface NicknameEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNickname: string;
}

export default function NicknameEditModal({
  isOpen,
  onClose,
  initialNickname,
}: NicknameEditModalProps) {
  const [nickname, setNickname] = useState('');
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate: updateNickname, isPending } = useUpdateNickname();

  // 모달이 열릴 때 초기 닉네임으로 폼 초기화 (렌더 중 상태 조정 패턴)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setNickname(initialNickname);
    }
  }

  const handleConfirm = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    const queryKey = getGetMyPageQueryKey();

    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData<MyPageResponse>(queryKey);
    queryClient.setQueryData<MyPageResponse>(queryKey, (old) =>
      old ? { ...old, myName: trimmed } : old,
    );

    updateNickname(
      { data: { nickname: trimmed } },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          queryClient.setQueryData(queryKey, previousData);
          showToast('닉네임 변경에 실패했어요');
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey });
        },
      },
    );
  };

  const isSubmitDisabled = isPending || !nickname.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <S.TextWrapper>
          <S.Title>변경할 닉네임을 입력해주세요</S.Title>
        </S.TextWrapper>
        <S.InputSection>
          <Input
            value={nickname}
            onChange={setNickname}
            placeholder="닉네임을 입력하세요"
            max={10}
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
            text="변경하기"
            variant="primary"
            onClick={handleConfirm}
            disabled={isSubmitDisabled}
            style={{ flex: 1 }}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
