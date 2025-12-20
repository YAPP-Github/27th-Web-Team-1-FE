import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { getGetGreetingMockHandler } from '@repo/api-client';
import { ExampleCard } from './ExampleCard';

const meta: Meta<typeof ExampleCard> = {
  title: 'Components/ExampleCard',
  component: ExampleCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ExampleCard>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [getGetGreetingMockHandler({ message: 'Storybook greeting from Orval.' })],
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/greeting', () => HttpResponse.json({ message: 'error' }, { status: 500 })),
      ],
    },
  },
};
