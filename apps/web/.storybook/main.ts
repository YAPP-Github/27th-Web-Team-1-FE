// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../public', '../src/assets'],

  webpackFinal: async (config) => {
    if (!config.module?.rules) return config;

    // 기존 Next.js SVG 처리 rule에서 svg 제외
    config.module.rules = config.module.rules.map((rule) => {
      if (
        typeof rule === 'object' &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg')
      ) {
        return {
          ...rule,
          exclude: /\.svg$/,
        };
      }
      return rule;
    });

    // SVGR로 SVG를 React 컴포넌트로 처리
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default config;
