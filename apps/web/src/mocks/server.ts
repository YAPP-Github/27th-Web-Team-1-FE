import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const mockServerListen = () => {
  const mockServer = setupServer(...handlers);

  mockServer.listen({ onUnhandledRequest: 'bypass' });

  mockServer.events.on('request:match', ({ request }) => {
    console.log(
      '\n[ MSW intercepted ]\n',
      request.method,
      request.url,
      `\n(cache: ${request.cache})\n`,
    );
  });
};
