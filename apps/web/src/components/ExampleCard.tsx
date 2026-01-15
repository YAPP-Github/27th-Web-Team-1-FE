'use client';

import { useGetGreeting } from '@repo/api-client';
import {
  Card,
  Heading,
  Body,
  Button,
  TestText,
} from './ExampleCard.styles';

export function ExampleCard() {
  const { data, isPending, error, refetch } = useGetGreeting();

  const description = error
    ? 'We could not load the greeting. Please try again.'
    : data?.message ?? 'dev deploy : Fetching the latest greeting...';

  return (
    <Card aria-live="polite">
      <TestText>Test Emotion Theming</TestText>

      <Heading>Emotion + TanStack Query</Heading>

      <Body>{description}</Body>

      <Button
        type="button"
        onClick={() => refetch()}
        disabled={isPending}
        aria-label="refresh greeting"
      >
        {isPending ? 'Refreshing...' : 'Refresh greeting'}
      </Button>
    </Card>
  );
}
