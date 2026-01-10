import '@emotion/react';
import { typography } from './typography';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string;
      surface: string;
      border: string;
      primary: string;
      text: string;
      muted: string;
      red: string;
    };
    typography: typeof typography;
  }
}
