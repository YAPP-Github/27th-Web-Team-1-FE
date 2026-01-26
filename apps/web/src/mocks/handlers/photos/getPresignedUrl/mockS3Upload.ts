import { http, HttpResponse, delay } from 'msw';

// 모든 AWS S3 PUT 요청을 가로챔
const S3_URL_PATTERN = /^https:\/\/.*\.?s3[.-].*\.amazonaws\.com\/.*/;

export const s3UploadHandler = http.put(S3_URL_PATTERN, async () => {
  await delay(500);
  return new HttpResponse(null, { status: 200 });
});
