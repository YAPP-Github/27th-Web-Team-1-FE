import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { globalIgnores } from 'eslint/config';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const testingLibraryConfig = testingLibrary.configs['flat/react'] ?? {};
const jestDomConfig = jestDom.configs['flat/recommended'] ?? {};

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
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
];

export default eslintConfig;
