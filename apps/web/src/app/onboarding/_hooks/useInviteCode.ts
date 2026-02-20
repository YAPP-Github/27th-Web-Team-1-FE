'use client';

import { useCallback } from 'react';
import { useCreateInvite, useRefreshInvite } from '@repo/api-client';
import { useOnboardingContext } from '../_contexts/OnboardingContext';
import { useToast } from '@/components/toast';

export function useInviteCode() {
  const { inviteCode, setInviteCode } = useOnboardingContext();
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
  }, [create, setInviteCode, showToast]);

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
  }, [refresh, setInviteCode, showToast]);

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
