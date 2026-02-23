import { defineConfig } from 'orval';

export default defineConfig({
  lokitApi: {
    input: 'https://develop-api.lokit.co.kr/api/docs',
    output: {
      target: './packages/api-client/src/generated.ts',
      schemas: './packages/api-client/src/model',
      mock: true,
      client: 'react-query',
      mode: 'single',
      override: {
        mutator: {
          path: './packages/api-client/src/customFetcher.ts',
          name: 'customFetcher',
        },
        query: {
          useSuspenseQuery: true,
        },
      },
    },
  },
});
