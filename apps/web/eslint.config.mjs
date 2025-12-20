import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

const testingLibraryConfig = testingLibrary.configs['flat/react'] ?? {};
const jestDomConfig = jestDom.configs['flat/recommended'] ?? {};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...testingLibraryConfig,
    files: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  {
    ...jestDomConfig,
    files: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
