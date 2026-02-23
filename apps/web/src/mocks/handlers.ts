import { getLokitAPIMock } from '@repo/api-client';
import { customHandlers } from './handlers/index';

// customHandlers에서 오버라이드하는 엔드포인트 제외
const excludedKeywords = ['/albums', '/photos', '/map', '/couples', '/my-page'];

const filteredLokitHandlers = getLokitAPIMock().filter((handler) => {
  const path = handler.info.path;
  if (typeof path !== 'string') return true;
  return !excludedKeywords.some((keyword) => path.includes(keyword));
});

export const handlers = [...customHandlers, ...filteredLokitHandlers];
