import path from 'path';

function quote(str) {
  return `'${str.replace(/'/g, "'\\''")}'`;
}

function buildLintCommand(workspaceDir) {
  return (files) => {
    const quotedFiles = files.map((f) => quote(f)).join(' ');
    const quotedRelFiles = files
      .map((f) => quote(path.relative(workspaceDir, f)))
      .join(' ');
    return [
      `prettier --write ${quotedFiles}`,
      `cd ${quote(workspaceDir)} && eslint --fix --max-warnings=0 ${quotedRelFiles}`,
    ];
  };
}

// 하위 서비스별 eslint 매핑
// 새 워크스페이스 추가 시 아래 형식으로 매핑을 추가하세요:
// 'apps/새서비스/**/*.{ts,tsx,js,jsx,mjs}': buildLintCommand('apps/새서비스'),
// 'packages/새패키지/**/*.{ts,tsx,js,jsx,mjs}': buildLintCommand('packages/새패키지'),
export default {
  '**/*.{json,md,css}': 'prettier --write',
  'apps/web/**/*.{ts,tsx,js,jsx,mjs}': buildLintCommand('apps/web'),
  'packages/api-client/**/*.{ts,tsx,js,jsx,mjs}': buildLintCommand('packages/api-client'),
  'packages/sentry/**/*.{ts,tsx,js,jsx,mjs}': buildLintCommand('packages/sentry'),
};
