import type { InviteCodePreviewResponse } from '@repo/api-client';

export interface VerifyCodeResult {
  success: boolean;
  data?: InviteCodePreviewResponse;
  errorCode?: string;
}
