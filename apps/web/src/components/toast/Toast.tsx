'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import * as S from './Toast.styles';

export interface ToastMessage {
  id: string;
  message: string;
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

  if (!toastRoot || toasts.length === 0) return null;

  return createPortal(
    <S.ToastContainer>
      {toasts.map((toast) => (
        <S.ToastItem key={toast.id} isExiting={toast.isExiting}>
          <S.ToastText>{toast.message}</S.ToastText>
        </S.ToastItem>
      ))}
    </S.ToastContainer>,
    toastRoot,
  );
};

export default Toast;
