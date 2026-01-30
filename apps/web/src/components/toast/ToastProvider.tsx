'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast, { ToastMessage } from './Toast';

interface ToastContextValue {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 3000;
const EXIT_ANIMATION_DURATION = 300;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, duration = TOAST_DURATION) => {
    const id = `${Date.now()}-${Math.random()}`;

    setToasts((prev) => [...prev, { id, message }]);

    // 퇴장 애니메이션 시작
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) => (toast.id === id ? { ...toast, isExiting: true } : toast)),
      );
    }, duration);

    // 토스트 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration + EXIT_ANIMATION_DURATION);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
