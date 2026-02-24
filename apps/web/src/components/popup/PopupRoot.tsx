'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import * as S from './Popup.styles';

const PopupRoot = ({ children }: { children: React.ReactNode }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 클라이언트 전용 DOM 접근을 위해 필요
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  if (!modalRoot) return null;

  return createPortal(<S.Root>{children}</S.Root>, modalRoot);
};

export default PopupRoot;
