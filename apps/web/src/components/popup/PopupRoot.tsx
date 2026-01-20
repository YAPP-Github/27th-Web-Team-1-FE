'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import * as S from './Popup.styles';

const PopupRoot = ({ children }: { children: React.ReactNode }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  if (!modalRoot) return null;

  return createPortal(<S.Root>{children}</S.Root>, modalRoot);
};

export default PopupRoot;
