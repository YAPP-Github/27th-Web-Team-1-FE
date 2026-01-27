import type { SelectedPhoto } from '../_types/photo';
import { extractGpsFromExif } from './extractGpsFromExif';

/**
 * File 객체에서 SelectedPhoto 생성
 *
 * 1. FileReader로 파일을 data URL로 읽음
 * 2. Image로 로드해서 width/height 추출
 * 3. EXIF에서 GPS 좌표 추출
 * 4. SelectedPhoto 형태로 조합
 */
export const fileToSelectedPhoto = async (file: File): Promise<SelectedPhoto | null> => {
  try {
    const [dataUrl, gps] = await Promise.all([
      readFileAsDataUrl(file),
      extractGpsFromExif(file),
    ]);

    if (!dataUrl) {
      return null;
    }

    const dimensions = await getImageDimensions(dataUrl);
    if (!dimensions) {
      return null;
    }

    return {
      id: crypto.randomUUID(),
      uri: dataUrl,
      filename: file.name,
      createdAt: new Date(file.lastModified).toISOString(),
      width: dimensions.width,
      height: dimensions.height,
      location: gps ?? undefined,
    };
  } catch {
    return null;
  }
};

const readFileAsDataUrl = (file: File): Promise<string | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};

const getImageDimensions = (
  dataUrl: string,
): Promise<{ width: number; height: number } | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
};
