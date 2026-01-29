/**
 * @fileoverview /photo/add/note 인터셉트 라우트 (모달 버전)
 *
 * Intercepting Routes란?
 * - 다른 경로로 이동할 때 현재 레이아웃 내에서 "가로채서" 표시하는 기능
 * - 폴더명 규칙: (.) = 같은 레벨의 경로를 인터셉트
 *
 * 폴더명 해석: (.)note
 * - (.) = /photo/add와 같은 레벨
 * - note = /photo/add/note 경로
 * - 결과: /photo/add/note로 이동 시 이 파일이 모달로 렌더링됨
 *
 * 동작 방식:
 * 1. /photo/add에서 사진 클릭 → router.push('/photo/add/note')
 * 2. 전체 페이지 전환 대신, 이 파일이 @modal slot에 렌더링됨
 * 3. URL은 /photo/add/note로 변경됨 (브라우저 히스토리에 추가)
 * 4. 닫기 클릭 → router.back() → /photo/add로 복귀
 *
 * 직접 URL 접속 시:
 * - /photo/add/note를 직접 입력하면 인터셉트되지 않음
 * - /photo/add/note/page.tsx가 전체 페이지로 렌더링됨
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { PHOTO_NOTE_OVERLAY_ANIMATION_DURATION } from '../../_constants';
import PhotoNoteOverlay from '../../note/_components/PhotoNoteOverlay';

export default function PhotoNoteModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    // 1. 닫기 애니메이션 시작
    setIsOpen(false);
    // 2. 애니메이션 완료 후 이전 페이지로 이동
    setTimeout(() => {
      router.back();
    }, PHOTO_NOTE_OVERLAY_ANIMATION_DURATION);
  };

  return (
    <AnimatePresence>
      {isOpen && <PhotoNoteOverlay onClose={handleClose} />}
    </AnimatePresence>
  );
}
