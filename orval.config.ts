import { defineConfig } from 'orval';

export default defineConfig({
  demoApi: {
    input: './apis/openapi.yaml',
    output: {
      target: './packages/api-client/src/generated.ts',
      schemas: './packages/api-client/src/model',
      mock: true,
      client: 'react-query',
      mode: 'single',
      override: {
        mutator: {
          path: './packages/api-client/src/fetcher.ts',
          name: 'customFetcher',
        },
      },
    },
  },
});
