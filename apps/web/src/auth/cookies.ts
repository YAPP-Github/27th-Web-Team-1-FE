const USER_ID_COOKIE_KEY = 'lokit_user_id';
const DEFAULT_MAX_AGE_DAYS = 7;

const isBrowser = () => typeof document !== 'undefined';

const getCookieValue = (key: string) => {
  if (!isBrowser()) return undefined;

  const cookies = document.cookie.split(';');
  const matched = cookies.find((cookie) => cookie.trim().startsWith(`${key}=`));

  if (!matched) return undefined;

  return decodeURIComponent(matched.split('=').slice(1).join('='));
};

const buildCookieOptions = (maxAgeDays: number) => {
  if (!isBrowser()) return '';

  const maxAgeSeconds = Math.max(1, Math.floor(maxAgeDays * 24 * 60 * 60));
  const isSecure = window.location.protocol === 'https:';
  const secureFlag = isSecure ? '; Secure' : '';

  return `; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secureFlag}`;
};

export const getUserIdFromCookie = () => {
  const rawValue = getCookieValue(USER_ID_COOKIE_KEY);
  if (!rawValue) return null;

  const numericValue = Number(rawValue);
  return Number.isFinite(numericValue) ? numericValue : null;
};

export const setUserIdCookie = (userId: number, maxAgeDays = DEFAULT_MAX_AGE_DAYS) => {
  if (!isBrowser()) return;

  const encodedValue = encodeURIComponent(String(userId));
  const options = buildCookieOptions(maxAgeDays);

  document.cookie = `${USER_ID_COOKIE_KEY}=${encodedValue}${options}`;
};

export const clearUserIdCookie = () => {
  if (!isBrowser()) return;

  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${USER_ID_COOKIE_KEY}=; Path=/; Max-Age=0; SameSite=Lax${secureFlag}`;
};

export const getAuthorizationHeader = () => {
  const userId = getUserIdFromCookie();
  return userId !== null ? `Bearer ${userId}` : undefined;
};
