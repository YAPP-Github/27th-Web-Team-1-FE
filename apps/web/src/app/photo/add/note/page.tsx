/**
 * @fileoverview /photo/add/note 직접 접속 시 페이지
 *
 * 이 페이지는 URL을 직접 입력하거나 새로고침 시, 또는 카메라 촬영 후 직접 이동 시 렌더링됩니다.
 * selectedPhoto 컨텍스트가 있으면 PhotoNoteOverlay를 보여주고, 없으면 사진 선택 페이지로 리다이렉트합니다.
 */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/constants';
import { usePhotoContext } from '../../_contexts/PhotoContext';
import PhotoNoteOverlay from './_components/PhotoNoteOverlay';

export default function PhotoNoteAddPage() {
  const router = useRouter();
  const { selectedPhoto } = usePhotoContext();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // selectedPhoto가 없으면 사진 선택 페이지로 리다이렉트
    if (!selectedPhoto) {
      router.replace(ROUTES.PHOTO.ADD);
    }
  }, [selectedPhoto, router]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    router.push(ROUTES.HOME);
  }, [router]);

  // selectedPhoto가 없으면 렌더링하지 않음
  if (!selectedPhoto) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && <PhotoNoteOverlay onClose={handleClose} />}
    </AnimatePresence>
  );
}
