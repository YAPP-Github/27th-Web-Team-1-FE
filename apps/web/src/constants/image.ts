/** 허용된 이미지 MIME 타입 (SVG 제외) */
export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/heic',
  'image/heif',
] as const;

export const isAllowedImageType = (file: File): boolean => {
  return ALLOWED_IMAGE_MIME_TYPES.includes(
    file.type.toLowerCase() as (typeof ALLOWED_IMAGE_MIME_TYPES)[number],
  );
};
