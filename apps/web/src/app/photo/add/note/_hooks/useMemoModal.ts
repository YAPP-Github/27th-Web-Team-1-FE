import { useState } from 'react';
import { usePhotoContext } from '@/app/photo/_contexts/PhotoContext';
import { STATE_SOURCE, type StateSource } from '@/app/photo/_constants/stateSource';

interface UseMemoModalOptions {
  /** 상태 소스: 사진 추가(NOTE) 또는 사진 수정(EDIT) */
  stateSource?: StateSource;
}

const useMemoModal = (options?: UseMemoModalOptions) => {
  const stateSource = options?.stateSource ?? STATE_SOURCE.NOTE;
  const { photoNoteState, updatePhotoNoteState, photoEditState, updatePhotoEditState } =
    usePhotoContext();

  const state = stateSource === STATE_SOURCE.EDIT ? photoEditState : photoNoteState;
  const updateState =
    stateSource === STATE_SOURCE.EDIT ? updatePhotoEditState : updatePhotoNoteState;

  const [tempMemo, setTempMemo] = useState(state.memo);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setTempMemo(state.memo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitMemo = () => {
    updateState({ memo: tempMemo });
    closeModal();
  };

  return {
    memo: state.memo,
    tempMemo,
    setTempMemo,
    isOpen,
    openModal,
    closeModal,
    submitMemo,
  };
};

export default useMemoModal;
