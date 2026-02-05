import type { SelectedPhoto } from '../_types/photo';
import { compressImage } from './compressImage';
import { extractGpsFromExif } from './extractGpsFromExif';

/**
 * File 객체에서 SelectedPhoto 생성
 *
 * 1. 이미지를 리사이즈 + JPEG 압축
 * 2. EXIF에서 GPS 좌표 추출 (원본 파일에서)
 * 3. SelectedPhoto 형태로 조합
 */
export const fileToSelectedPhoto = async (file: File): Promise<SelectedPhoto | null> => {
  try {
    const [compressed, gps] = await Promise.all([
      compressImage(file),
      extractGpsFromExif(file),
    ]);

    return {
      id: crypto.randomUUID(),
      uri: compressed.dataUrl,
      filename: file.name,
      createdAt: new Date(file.lastModified).toISOString(),
      width: compressed.width,
      height: compressed.height,
      location: gps ?? undefined,
    };
  } catch {
    return null;
  }
};
