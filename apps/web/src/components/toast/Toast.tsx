'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import InfoIcon from '@/assets/images/info.svg';
import SuccessIcon from '@/assets/images/success.svg';
import WarningIcon from '@/assets/images/warning.svg';
import * as S from './Toast.styles';

export interface ToastMessage {
  id: string;
  message: string;
  variant?: 'default' | 'info' | 'warn' | 'success';
  isExiting?: boolean;
}

interface ToastProps {
  toasts: ToastMessage[];
}

const Toast = ({ toasts }: ToastProps) => {
  const [toastRoot, setToastRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById('toast-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'toast-root';
      document.body.appendChild(root);
    }
    setToastRoot(root);
  }, []);

  const getIcon = (variant?: 'default' | 'info' | 'warn' | 'success') => {
    switch (variant) {
      case 'info':
        return <InfoIcon width={20} height={20} />;
      case 'warn':
        return <WarningIcon width={20} height={20} />;
      case 'success':
        return <SuccessIcon width={20} height={20} />;
      default:
        return null;
    }
  };

  if (!toastRoot || toasts.length === 0) return null;

  return createPortal(
    <S.ToastContainer>
      {toasts.map((toast) => (
        <S.ToastItem key={toast.id} isExiting={toast.isExiting}>
          {toast.variant && toast.variant !== 'default' && (
            <S.ToastIcon>{getIcon(toast.variant)}</S.ToastIcon>
          )}
          <S.ToastText>{toast.message}</S.ToastText>
        </S.ToastItem>
      ))}
    </S.ToastContainer>,
    toastRoot,
  );
};

export default Toast;
