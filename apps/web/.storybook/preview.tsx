import type { Decorator, Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from "../src/theme/globalStyles";
import { theme } from '../src/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

initialize({ onUnhandledRequest: 'bypass' });


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const withGlobalStyle: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
    <Story />
    </QueryClientProvider>
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withGlobalStyle],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
