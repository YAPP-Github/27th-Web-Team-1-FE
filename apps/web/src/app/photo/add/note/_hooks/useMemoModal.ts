import { useState, useEffect, useRef } from 'react';

const useMemoModal = (initialMemo: string = '') => {
  const [memo, setMemo] = useState(initialMemo);
  const [tempMemo, setTempMemo] = useState(initialMemo);
  const [isOpen, setIsOpen] = useState(false);
  const isInitialized = useRef(false);

  // 초기값이 비동기로 로드되는 경우 동기화
  useEffect(() => {
    if (!isInitialized.current && initialMemo) {
      setMemo(initialMemo);
      setTempMemo(initialMemo);
      isInitialized.current = true;
    }
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
