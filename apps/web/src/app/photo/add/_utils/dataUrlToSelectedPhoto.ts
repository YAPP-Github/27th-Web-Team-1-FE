import type { SelectedPhoto } from '../_types/photo';

/**
 * data URL에서 SelectedPhoto 생성 (카메라 촬영용)
 *
 * 1. Image로 로드해서 width/height 추출
 * 2. SelectedPhoto 형태로 조합
 */
export const dataUrlToSelectedPhoto = async (
  dataUrl: string,
  location?: { latitude: number; longitude: number },
): Promise<SelectedPhoto | null> => {
  try {
    const dimensions = await getImageDimensions(dataUrl);
    if (!dimensions) {
      return null;
    }

    const id = crypto.randomUUID();

    return {
      id,
      uri: dataUrl,
      filename: `photo_${id}.jpg`,
      createdAt: new Date().toISOString(),
      width: dimensions.width,
      height: dimensions.height,
      location,
    };
  } catch {
    return null;
  }
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
