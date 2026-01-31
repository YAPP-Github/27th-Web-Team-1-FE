import type { PhotoResponse } from '@repo/api-client';

interface PhotoWithDateDisplay extends PhotoResponse {
  showDate: boolean;
}

/**
 * 날짜 문자열에서 KST(UTC+9) 기준 날짜 부분만 추출 (YYYY-MM-DD)
 */
const getDateOnly = (dateString?: string): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + kstOffset);
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 사진 목록을 날짜순으로 정렬하고, 각 날짜의 첫 번째 사진에만 날짜를 표시하도록 처리
 * @param photos 사진 목록
 * @returns 날짜 표시 여부가 포함된 정렬된 사진 목록
 */
export const processPhotosWithDateDisplay = (
  photos: PhotoResponse[],
): PhotoWithDateDisplay[] => {
  // 날짜순으로 정렬 (최신순)
  const sortedPhotos = [...photos].sort((a, b) => {
    const dateA = a.takenAt ? new Date(a.takenAt).getTime() : 0;
    const dateB = b.takenAt ? new Date(b.takenAt).getTime() : 0;
    return dateB - dateA;
  });

  // 각 날짜의 첫 번째 사진에만 showDate: true 설정
  const seenDates = new Set<string>();

  return sortedPhotos.map((photo) => {
    const dateOnly = getDateOnly(photo.takenAt);

    if (dateOnly && !seenDates.has(dateOnly)) {
      seenDates.add(dateOnly);
      return { ...photo, showDate: true };
    }

    return { ...photo, showDate: false };
  });
};
