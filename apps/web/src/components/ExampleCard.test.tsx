import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AppProviders } from '@/app/providers';
import { server } from '@/tests/msw-server';
import { http, HttpResponse } from 'msw';
import { ExampleCard } from './ExampleCard';

function renderWithProviders(ui: ReactNode) {
  return render(<AppProviders showDevtools={false}>{ui}</AppProviders>);
}

describe('ExampleCard', () => {
  const greetingMessage = 'Testing greeting from MSW.';

  beforeEach(() => {
    server.use(
      http.get('*/greeting', () => HttpResponse.json({ message: greetingMessage })),
    );
  });

  it('renders the greeting from the API handler', async () => {
    renderWithProviders(<ExampleCard />);

    expect(await screen.findByText(greetingMessage)).toBeInTheDocument();
  });

  it('can refetch the greeting', async () => {
    renderWithProviders(<ExampleCard />);

    const button = await screen.findByRole('button', { name: /refresh greeting/i });
    await waitFor(() => expect(button).toBeEnabled());
  });
});
