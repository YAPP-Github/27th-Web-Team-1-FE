import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';
import { server } from './msw-server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
