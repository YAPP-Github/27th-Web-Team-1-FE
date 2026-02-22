'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useVerifyInviteCode,
  useJoinByInviteCode,
  getGetMyStatusQueryKey,
  ApiError,
} from '@repo/api-client';
import type { VerifyCodeResult } from '../_types';

export function useCodeVerification() {
  const queryClient = useQueryClient();
  const { mutateAsync: verify, isPending: isVerifying } = useVerifyInviteCode();
  const { mutateAsync: join, isPending: isJoining } = useJoinByInviteCode();

  const verifyCode = useCallback(
    async (code: string): Promise<VerifyCodeResult> => {
      try {
        const result = await verify({ data: { inviteCode: code } });
        return { success: true, data: result };
      } catch (error) {
        if (error instanceof ApiError) {
          const errorCode = error?.data?.errorCode || String(error?.code);
          return { success: false, errorCode };
        }
        return { success: false, errorCode: 'UNKNOWN_ERROR' };
      }
    },
    [verify],
  );

  const joinCode = useCallback(
    async (code: string) => {
      try {
        await join({ data: { inviteCode: code } });
        queryClient.invalidateQueries({ queryKey: getGetMyStatusQueryKey() });
        return { success: true };
      } catch (error) {
        if (error instanceof ApiError) {
          const errorCode = error?.data?.errorCode || String(error?.code);
          return { success: false, errorCode };
        }
        return { success: false, errorCode: 'UNKNOWN_ERROR' };
      }
    },
    [join, queryClient],
  );

  return {
    verifyCode,
    joinCode,
    isVerifying,
    isJoining,
  };
}
