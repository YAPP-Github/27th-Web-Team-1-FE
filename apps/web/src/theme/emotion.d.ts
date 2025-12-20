import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string;
      surface: string;
      border: string;
      primary: string;
      text: string;
      muted: string;
    };
  }
}
