/**
 * @fileoverview /photo/add 레이아웃 - Parallel Routes를 위한 설정
 *
 * Next.js Parallel Routes란?
 * - 같은 레이아웃 내에서 여러 페이지를 동시에 렌더링하는 기능
 * - @폴더명 형식으로 "slot"을 정의 (예: @modal)
 * - 레이아웃에서 slot을 props로 받아서 렌더링
 *
 * 이 파일의 역할:
 * - children: /photo/add/page.tsx (사진 선택 화면)
 * - modal: @modal 폴더의 콘텐츠 (사진 정보 기입 오버레이)
 *
 * 동작 방식:
 * 1. /photo/add 접속 → children만 렌더링 (modal은 default.tsx = null)
 * 2. /photo/add/note로 이동 → children + modal 동시 렌더링 (인터셉트됨)
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 */
'use client';

import { ReactNode } from 'react';

interface PhotoAddLayoutProps {
  children: ReactNode;
  /** @modal slot - 사진 정보 기입 오버레이 */
  modal: ReactNode;
}

export default function PhotoAddLayout({ children, modal }: PhotoAddLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
