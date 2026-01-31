import { Sentry } from '.';
import { SENTRY_CONTEXTS, SENTRY_TAGS, SENTRY_TAG_VALUES } from './constants';

interface ApiErrorLike {
  code: number;
  errorCode: string;
  detail: string;
  instance: string;
  errors: Record<string, unknown>;
}

/**
 * API 에러를 센트리로 캡쳐하는 함수
 * @param error - ApiError
 */
export const captureApiError = (error: ApiErrorLike) => {
  Sentry.withScope((scope: Sentry.Scope) => {
    scope.setTag(SENTRY_TAGS.TYPE, SENTRY_TAG_VALUES.TYPE_API);
    scope.setTag(SENTRY_TAGS.ERROR_CODE, String(error.code));
    scope.setTag(SENTRY_TAGS.ERROR_ERROR_CODE, error.errorCode);

    scope.setContext(SENTRY_CONTEXTS.API_ERROR, {
      code: error.code,
      errorCode: error.errorCode,
      detail: error.detail,
      instance: error.instance,
      errors: error.errors,
    });

    Sentry.captureException(error);
  });
};
