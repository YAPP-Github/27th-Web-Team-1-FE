import { css, Theme } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: var(--font-pretendard),
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;
