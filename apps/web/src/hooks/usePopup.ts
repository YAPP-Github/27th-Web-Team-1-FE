import { useState } from 'react';
import useEscapeKeyClose from './useEscapeKeyClose';
import useScrollLock from './useScrollLock';

interface UsePopupOptions {
  initialOpen?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const usePopup = ({
  initialOpen = false,
  closeOnEscape = true,
  lockScroll = true,
  onOpen,
  onClose,
}: UsePopupOptions = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  useScrollLock(isOpen && lockScroll);
  useEscapeKeyClose({ closeOnEscape, isOpen, onClose: handleClose });

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

export default usePopup;
