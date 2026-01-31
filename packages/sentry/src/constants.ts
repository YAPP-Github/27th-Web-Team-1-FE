export const SENTRY_TAGS = {
  TYPE: 'type',
  ERROR_CODE: 'error.code',
  ERROR_ERROR_CODE: 'error.errorCode',
} as const;

export const SENTRY_TAG_VALUES = {
  TYPE_API: 'api',
} as const;

export const SENTRY_CONTEXTS = {
  API_ERROR: 'api_error',
} as const;
