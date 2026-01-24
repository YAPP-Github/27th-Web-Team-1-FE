import '@emotion/react';
import { typography } from './typography';
import { colors } from './colors';
import { effects } from './effects';
import { zIndex } from './zIndex';
import { layout } from './layout';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    typography: typeof typography;
    effects: typeof effects;
    zIndex: typeof zIndex;
    layout: typeof layout;
  }
}
