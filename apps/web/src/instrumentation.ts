export async function register() {
  console.log(
    '[instrumentation] register called',
    'ENABLE_MOCK:',
    process.env.NEXT_PUBLIC_ENABLE_MOCK,
    'RUNTIME:',
    process.env.NEXT_RUNTIME,
  );

  if (
    process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true' &&
    process.env.NEXT_RUNTIME === 'nodejs'
  ) {
    const { mockServerListen } = await import('./mocks/server');
    mockServerListen();
  }
}
