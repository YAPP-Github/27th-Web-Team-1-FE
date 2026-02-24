'use client';

import { useCallback } from 'react';
import { useToast } from '@/components/toast';
import CopySvg from '@/assets/images/copy.svg';
import * as S from './CopyCodeClient.styles';

interface CopyCodeClientProps {
  inviteCode: string | null;
}

export default function CopyCodeClient({ inviteCode }: CopyCodeClientProps) {
  const { showToast } = useToast();

  const handleCopy = useCallback(async () => {
    if (!inviteCode) return;

    try {
      await navigator.clipboard.writeText(inviteCode);
      showToast('복사되었어요');
    } catch (error) {
      showToast('복사에 실패했어요');
    }
  }, [inviteCode, showToast]);

  return (
    <S.CopyIconButton type="button" onClick={handleCopy} aria-label="복사">
      <CopySvg />
    </S.CopyIconButton>
  );
}
