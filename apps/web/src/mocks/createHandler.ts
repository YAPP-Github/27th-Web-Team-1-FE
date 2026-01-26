import { http, HttpResponse, delay, type JsonBodyType } from 'msw';
import type { MockApiResponse } from './types';

type ResponseKey<T> = T extends MockApiResponse<infer K, unknown> ? K : never;

/**
 * MockApiResponse 설정으로부터 MSW 핸들러 생성
 *
 * @param config - MockApiResponse 설정
 * @param responseKey - 사용할 응답 키
 * @param validator - 요청 유효성 검사 함수 (선택)
 */
export const createHandler = <T extends MockApiResponse<string, JsonBodyType>>(
  config: T,
  responseKey: ResponseKey<T>,
  validator?: (request: Request) => string | null
) => {
  const responseItem = config.response[responseKey];

  return http[config.method](`*${config.url}`, async ({ request }) => {
    await delay(responseItem.delayTime);

    if (validator) {
      const errorKey = validator(request);
      if (errorKey && config.response[errorKey]) {
        const errorResponse = config.response[errorKey];
        return HttpResponse.json(errorResponse.data, {
          status: errorResponse.status,
        });
      }
    }

    return HttpResponse.json(responseItem.data, {
      status: responseItem.status,
    });
  });
};
