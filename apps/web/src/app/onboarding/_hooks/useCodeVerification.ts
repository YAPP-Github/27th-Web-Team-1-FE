'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useVerifyInviteCode,
  useConfirmInviteCode,
  getGetMyStatusQueryKey,
  type InviteCodePreviewResponse,
  ApiError,
} from '@repo/api-client';

export interface VerifyCodeResult {
  success: boolean;
  data?: InviteCodePreviewResponse;
  errorCode?: string;
}

export function useCodeVerification() {
  const queryClient = useQueryClient();
  const { mutateAsync: verify, isPending: isVerifying } = useVerifyInviteCode();
  const { mutateAsync: confirm, isPending: isConfirming } = useConfirmInviteCode();

  const verifyCode = useCallback(
    async (code: string): Promise<VerifyCodeResult> => {
      try {
        const result = await verify({ data: { inviteCode: code } });
        return { success: true, data: result };
      } catch (error: any) {
        const errorCode = error?.data?.errorCode || error?.code;
        return { success: false, errorCode };
      }
    },
    [verify],
  );

  const confirmCode = useCallback(
    async (code: string) => {
      try {
        await confirm({ data: { inviteCode: code } });
        queryClient.invalidateQueries({ queryKey: getGetMyStatusQueryKey() });
        return { success: true };
      } catch (error: any) {
        const errorCode = error?.data?.errorCode || error?.code;
        return { success: false, errorCode };
      }
    },
    [confirm, queryClient],
  );

  return {
    verifyCode,
    confirmCode,
    isVerifying,
    isConfirming,
  };
}
