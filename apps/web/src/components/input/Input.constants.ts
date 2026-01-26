export const DEFAULT_MAX_LENGTH = 1000;

export const INPUT_TYPE = {
  INPUT: 'input',
  SEARCH: 'search',
} as const;

export type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];
