import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    config.plugins = config.plugins ?? [];
    config.plugins.push(tsconfigPaths());
    config.define = {
      ...config.define,
      "process.env": {},
    };
    return config;
  },
};

export default config;
