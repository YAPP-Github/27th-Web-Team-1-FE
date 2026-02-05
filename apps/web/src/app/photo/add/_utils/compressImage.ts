const DEFAULT_MAX_DIMENSION = 1920;
const DEFAULT_QUALITY = 0.75;

interface CompressResult {
  dataUrl: string;
  width: number;
  height: number;
}

interface CompressOptions {
  maxDimension?: number;
  quality?: number;
}

/**
 * 이미지 파일을 Canvas로 리사이즈 + JPEG 압축
 *
 * - 긴 변 기준 maxDimension 이내로 리사이즈 (비율 유지)
 * - 이미 작으면 리사이즈하지 않고 JPEG 재압축만 수행
 * - Object URL 사용으로 중간 data URL 생성 방지
 */
export const compressImage = async (
  file: File,
  options?: CompressOptions,
): Promise<CompressResult> => {
  const maxDimension = options?.maxDimension ?? DEFAULT_MAX_DIMENSION;
  const quality = options?.quality ?? DEFAULT_QUALITY;

  const objectUrl = URL.createObjectURL(file);

  try {
    const img = await loadImage(objectUrl);

    const { width, height } = calculateDimensions(img.width, img.height, maxDimension);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    ctx.drawImage(img, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg', quality);

    return { dataUrl, width, height };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
};

const calculateDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxDimension: number,
): { width: number; height: number } => {
  if (originalWidth <= maxDimension && originalHeight <= maxDimension) {
    return { width: originalWidth, height: originalHeight };
  }

  const ratio = Math.min(maxDimension / originalWidth, maxDimension / originalHeight);

  return {
    width: Math.round(originalWidth * ratio),
    height: Math.round(originalHeight * ratio),
  };
};
