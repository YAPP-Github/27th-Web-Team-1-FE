import { useState } from 'react';

const useMemoModal = () => {
  const [memo, setMemo] = useState('');
  const [tempMemo, setTempMemo] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
    isOpen,
    openModal,
    closeModal,
    submitMemo,
  };
};

export default useMemoModal;
