'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface DisconnectContextValue {
  isConfirmed: boolean;
  toggleConfirm: () => void;
  isSubmitEnabled: boolean;
}

const DisconnectContext = createContext<DisconnectContextValue | null>(null);

export function DisconnectProvider({ children }: { children: ReactNode }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const toggleConfirm = useCallback(() => {
    setIsConfirmed((prev) => !prev);
  }, []);

  const isSubmitEnabled = isConfirmed;

  const value = useMemo(
    () => ({
      isConfirmed,
      toggleConfirm,
      isSubmitEnabled,
    }),
    [isConfirmed, toggleConfirm, isSubmitEnabled],
  );

  return (
    <DisconnectContext.Provider value={value}>{children}</DisconnectContext.Provider>
  );
}

export function useDisconnectContext() {
  const context = useContext(DisconnectContext);
  if (!context) {
    throw new Error('useDisconnectContext must be used within DisconnectProvider');
  }
  return context;
}
