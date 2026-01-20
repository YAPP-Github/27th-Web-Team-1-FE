import { useEffect } from 'react';

interface UseEscapeKeyCloseProps {
  closeOnEscape: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const useEscapeKeyClose = ({
  closeOnEscape,
  isOpen,
  onClose,
}: UseEscapeKeyCloseProps) => {
  useEffect(() => {
    if (!closeOnEscape) return;
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    addEventListener('keydown', handleKeyDown);

    return () => {
      removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);
};

export default useEscapeKeyClose;
