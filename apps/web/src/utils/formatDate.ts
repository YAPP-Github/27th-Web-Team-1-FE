/**
 * ISO 8601 형식의 날짜를 YYYY.MM.DD 형식으로 변환합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2025-01-15T12:00:00Z")
 * @returns YYYY.MM.DD 형식의 문자열 (예: "2025.01.15")
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '날짜 없음';

  // 이미 YYYY.MM.DD 형식인 경우 그대로 반환
  if (/^\d{4}\.\d{2}\.\d{2}$/.test(dateString)) {
    return dateString;
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '날짜 없음';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
