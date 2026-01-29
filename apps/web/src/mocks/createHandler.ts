import { http, HttpResponse, delay, type JsonBodyType, type PathParams } from 'msw';
import type { MockApiResponse } from './types';

type ResponseKey<T> = T extends MockApiResponse<infer K, unknown> ? K : never;

interface CreateHandlerOptions<TData extends JsonBodyType> {
  validator?: (request: Request) => string | null;
  dataResolver?: (params: PathParams) => TData;
}

/**
 * MockApiResponse 설정으로부터 MSW 핸들러 생성
 *
 * @param config - MockApiResponse 설정
 * @param responseKey - 사용할 응답 키
 * @param options - 옵션 (validator, dataResolver)
 */
export const createHandler = <T extends MockApiResponse<string, JsonBodyType>>(
  config: T,
  responseKey: ResponseKey<T>,
  options?: CreateHandlerOptions<JsonBodyType> | ((request: Request) => string | null),
) => {
  const responseItem = config.response[responseKey];

  // 하위 호환성: 세 번째 인자가 함수면 validator로 처리
  const { validator, dataResolver } =
    typeof options === 'function'
      ? { validator: options, dataResolver: undefined }
      : (options ?? {});

  return http[config.method](`*${config.url}`, async ({ request, params }) => {
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

    // dataResolver가 있으면 동적으로 데이터 생성
    const data = dataResolver ? dataResolver(params) : responseItem.data;

    return HttpResponse.json(data, {
      status: responseItem.status,
    });
  });
};
