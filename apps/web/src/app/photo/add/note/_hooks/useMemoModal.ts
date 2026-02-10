import { useState, useEffect } from 'react';
import { usePhotoContext } from '@/app/photo/_contexts/PhotoContext';

interface UseMemoModalOptions {
  /** 로컬 상태 사용 (편집 화면용) */
  initialMemo?: string;
}

const useMemoModal = (options?: UseMemoModalOptions) => {
  const useLocalState = options?.initialMemo !== undefined;
  const { photoNoteState, updatePhotoNoteState } = usePhotoContext();

  // 로컬 상태 (편집 화면용)
  const [localMemo, setLocalMemo] = useState(options?.initialMemo ?? '');
  const [tempMemo, setTempMemo] = useState(
    useLocalState ? (options?.initialMemo ?? '') : photoNoteState.memo,
  );
  const [isOpen, setIsOpen] = useState(false);

  // initialMemo가 변경될 때 로컬 상태 업데이트 (편집 화면용)
  useEffect(() => {
    if (useLocalState && options?.initialMemo !== undefined) {
      setLocalMemo(options.initialMemo);
      setTempMemo(options.initialMemo);
    }
  }, [useLocalState, options?.initialMemo]);

  const memo = useLocalState ? localMemo : photoNoteState.memo;

  const openModal = () => {
    setTempMemo(memo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitMemo = () => {
    if (useLocalState) {
      setLocalMemo(tempMemo);
    } else {
      updatePhotoNoteState({ memo: tempMemo });
    }
    closeModal();
  };

  return {
    memo,
    tempMemo,
    setTempMemo,
    isOpen,
    openModal,
    closeModal,
    submitMemo,
  };
};

export default useMemoModal;
