import { API_URL } from '@/constants/apiUrl';
import { ROUTES } from '@/constants/routes';

/**
 * Logout 함수 (향후 백엔드 logout API 사용)
 * httpOnly 쿠키는 JavaScript에서 직접 삭제할 수 없으므로,
 * 백엔드 logout 엔드포인트를 호출하여 쿠키를 만료시킨다.
 */
export const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_URL.AUTH.LOGOUT}`, {
      method: 'POST',
      credentials: 'include',
    });
  } finally {
    if (typeof window !== 'undefined') {
      window.location.href = ROUTES.LOGIN;
    }
  }
};
