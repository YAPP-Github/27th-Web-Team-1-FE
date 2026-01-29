/**
 * @fileoverview @modal slot의 기본값
 *
 * Parallel Routes에서 default.tsx란?
 * - slot이 활성화되지 않았을 때 렌더링되는 기본 컴포넌트
 * - 없으면 Next.js가 404를 반환할 수 있음
 *
 * 이 파일의 역할:
 * - /photo/add 페이지에서 modal slot은 비어있어야 함
 * - null을 반환하여 아무것도 렌더링하지 않음
 *
 * 언제 사용되나?
 * - /photo/add 직접 접속 시 (오버레이 없음)
 * - /photo/add/note에서 뒤로가기로 돌아왔을 때
 */
export default function Default() {
  return null;
}
