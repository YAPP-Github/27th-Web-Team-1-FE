import { getLokitAPIMock } from '@repo/api-client';
import { customHandlers } from './handlers/index';

// photos 관련 핸들러 제외 (customHandlers에서 오버라이드)
const excludedKeywords = ['/photos/presigned-url', '/photos'];

const filteredLokitHandlers = getLokitAPIMock().filter((handler) => {
  const path = handler.info.path;
  if (typeof path !== 'string') return true;
  return !excludedKeywords.some((keyword) => path.includes(keyword));
});

export const handlers = [...customHandlers, ...filteredLokitHandlers];
