import type { NextConfig } from 'next';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://develop-api.lokit.co.kr';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    // Next.js 내장 이미지 로더에서 SVG를 제외하고, SVGR로 처리
    // 서버/클라이언트 컴포넌트 모두에서 SVG를 React 컴포넌트로 import 가능
    const excludeSvgFromImageRules = (rules: unknown[]) => {
      for (const rule of rules) {
        const r = rule as Record<string, unknown>;
        if (!r) continue;
        if (r.oneOf) excludeSvgFromImageRules(r.oneOf as unknown[]);
        const test = r.test;
        if (test instanceof RegExp) {
          if (test.test('.svg') && test.test('.png')) {
            r.test = new RegExp(test.source.replace(/\|svg|svg\|/, ''), test.flags);
          }
        }
      }
    };
    excludeSvgFromImageRules(config.module.rules);

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { not: /\.css$/i },
      type: 'javascript/auto',
      use: ['@svgr/webpack'],
    });

    return config;
  },
  allowedDevOrigins: ['local.lokit.co.kr'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
