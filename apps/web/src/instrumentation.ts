export async function register() {
  if (
    process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true' &&
    process.env.NEXT_RUNTIME === 'nodejs'
  ) {
    const { mockServerListen } = await import('./mocks/server');
    mockServerListen();
  }
}
