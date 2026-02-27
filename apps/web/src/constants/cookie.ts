const COOKIE_PREFIX = process.env.NODE_ENV === 'development' ? 'dev-' : '';

export const ACCESS_TOKEN_COOKIE = `${COOKIE_PREFIX}accessToken`;
export const COUPLE_STATUS_COOKIE = `${COOKIE_PREFIX}coupleStatus`;
