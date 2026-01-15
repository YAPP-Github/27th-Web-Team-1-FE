import '@emotion/react';
import { typography } from './typography';
import { colors } from './colors';
import { effects } from './effects';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    typography: typeof typography;
    effects: typeof effects;
  }
}
