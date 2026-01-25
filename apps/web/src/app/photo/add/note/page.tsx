/**
 * @fileoverview /photo/add/note 직접 접속 시 fallback
 *
 * 이 페이지는 URL을 직접 입력하거나 새로고침 시에만 렌더링됩니다.
 * 정상적인 플로우(/photo/add에서 사진 선택)에서는 intercepting route가 사용됩니다.
 *
 * selectedPhoto 컨텍스트가 없으므로 사진 선택 페이지로 리다이렉트합니다.
 */
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

export default function PhotoNoteAddPage() {
  redirect(ROUTES.PHOTO.ADD);
}
