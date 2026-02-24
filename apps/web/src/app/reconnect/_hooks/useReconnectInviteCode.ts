'use client';

import { useState, useCallback } from 'react';
import { useCreateInvite, useRefreshInvite } from '@repo/api-client';
import { useToast } from '@/components/toast';

interface InviteCode {
  code: string;
  expiresAt: string;
}

export function useReconnectInviteCode() {
  const [inviteCode, setInviteCode] = useState<InviteCode | null>(null);
  const { showToast } = useToast();
  const { mutateAsync: create, isPending: isCreating } = useCreateInvite();
  const { mutateAsync: refresh, isPending: isRefreshing } = useRefreshInvite();

  const createCode = useCallback(async () => {
    try {
      const result = await create();
      if (result.inviteCode && result.expiresAt) {
        setInviteCode({
          code: result.inviteCode,
          expiresAt: result.expiresAt,
        });
      }
    } catch (error) {
      showToast('코드 생성에 실패했어요');
    }
  }, [create, showToast]);

  const refreshCode = useCallback(async () => {
    try {
      const result = await refresh();
      if (result.inviteCode && result.expiresAt) {
        setInviteCode({
          code: result.inviteCode,
          expiresAt: result.expiresAt,
        });
        showToast('코드가 갱신되었어요');
      }
    } catch (error) {
      showToast('코드 갱신에 실패했어요');
    }
  }, [refresh, showToast]);

  const copyCode = useCallback(async () => {
    if (!inviteCode?.code) return;

    try {
      await navigator.clipboard.writeText(inviteCode.code);
      showToast('복사되었어요');
    } catch (error) {
      showToast('복사에 실패했어요');
    }
  }, [inviteCode?.code, showToast]);

  return {
    inviteCode,
    createCode,
    refreshCode,
    copyCode,
    isLoading: isCreating || isRefreshing,
  };
}
