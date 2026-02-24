'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface SignoutContextValue {
  selectedReasons: Set<string>;
  toggleReason: (reason: string) => void;
  comment: string;
  setComment: (comment: string) => void;
  isConfirmed: boolean;
  toggleConfirm: () => void;
  isSubmitEnabled: boolean;
}

const SignoutContext = createContext<SignoutContextValue | null>(null);

export function SignoutProvider({ children }: { children: ReactNode }) {
  const [selectedReasons, setSelectedReasons] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const toggleReason = useCallback((reason: string) => {
    setSelectedReasons((prev) => {
      const next = new Set(prev);
      if (next.has(reason)) {
        next.delete(reason);
      } else {
        next.add(reason);
      }
      return next;
    });
  }, []);

  const toggleConfirm = useCallback(() => {
    setIsConfirmed((prev) => !prev);
  }, []);

  const isSubmitEnabled = selectedReasons.size > 0 && isConfirmed;

  const value = useMemo(
    () => ({
      selectedReasons,
      toggleReason,
      comment,
      setComment,
      isConfirmed,
      toggleConfirm,
      isSubmitEnabled,
    }),
    [selectedReasons, toggleReason, comment, isConfirmed, toggleConfirm, isSubmitEnabled],
  );

  return <SignoutContext.Provider value={value}>{children}</SignoutContext.Provider>;
}

export function useSignoutContext() {
  const context = useContext(SignoutContext);
  if (!context) {
    throw new Error('useSignoutContext must be used within SignoutProvider');
  }
  return context;
}
