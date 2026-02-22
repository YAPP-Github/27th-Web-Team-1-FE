import path from 'path';

function buildEslintCommand(workspaceDir) {
  return (files) => {
    const relFiles = files.map((f) => path.relative(workspaceDir, f)).join(' ');
    return `cd ${workspaceDir} && eslint --fix --max-warnings=0 ${relFiles}`;
  };
}

// 하위 서비스별 eslint 매핑
// 새 워크스페이스 추가 시 아래 형식으로 매핑을 추가하세요:
// 'apps/새서비스/**/*.{ts,tsx,js,jsx,mjs}': buildEslintCommand('apps/새서비스'),
// 'packages/새패키지/**/*.{ts,tsx,js,jsx,mjs}': buildEslintCommand('packages/새패키지'),
export default {
  '*.{ts,tsx,js,jsx,json,md,css}': 'prettier --write',
  'apps/web/**/*.{ts,tsx,js,jsx,mjs}': buildEslintCommand('apps/web'),
  'packages/api-client/**/*.{ts,tsx,js,jsx,mjs}':
    buildEslintCommand('packages/api-client'),
  'packages/sentry/**/*.{ts,tsx,js,jsx,mjs}': buildEslintCommand('packages/sentry'),
};
