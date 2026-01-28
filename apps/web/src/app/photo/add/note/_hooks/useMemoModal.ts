import { useState, useEffect } from 'react';

const useMemoModal = (initialMemo: string = '') => {
  const [memo, setMemo] = useState(initialMemo);
  const [tempMemo, setTempMemo] = useState(initialMemo);
  const [isOpen, setIsOpen] = useState(false);

  // initialMemo가 변경될 때마다 상태 재설정
  useEffect(() => {
    setMemo(initialMemo);
    setTempMemo(initialMemo);
  }, [initialMemo]);

  const openModal = () => {
    setTempMemo(memo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitMemo = () => {
    setMemo(tempMemo);
    closeModal();
  };

  return {
    memo,
    tempMemo,
    setTempMemo,
    setMemo,
    isOpen,
    openModal,
    closeModal,
    submitMemo,
  };
};

export default useMemoModal;
