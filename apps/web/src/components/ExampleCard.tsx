'use client';

import styled from '@emotion/styled';
import { useGetGreeting } from '@repo/api-client';

const Card = styled.section(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: '1rem',
  boxShadow: '0px 8px 30px rgba(15, 23, 42, 0.08)',
  maxWidth: '32rem',
  padding: '2rem',
  width: '100%',
}));

const Heading = styled.h1(({ theme }) => ({
  color: theme.colors.text,
  fontSize: '1.85rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
}));

const Body = styled.p(({ theme }) => ({
  color: theme.colors.muted,
  fontSize: '1.05rem',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
}));

const Button = styled.button(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.primary,
  border: 'none',
  borderRadius: '999px',
  color: '#fff',
  cursor: 'pointer',
  display: 'inline-flex',
  fontWeight: 600,
  gap: '0.4rem',
  justifyContent: 'center',
  padding: '0.75rem 1.5rem',
  transition: 'opacity 120ms ease-in-out',
  width: 'fit-content',
  '&:hover': {
    opacity: 0.92,
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
}));

const TestText = styled.p`
  color: ${({ theme }) => theme.colors.red};
`;


export function ExampleCard() {
  const { data, isPending, error, refetch } = useGetGreeting();

  const description = error
    ? 'We could not load the greeting. Please try again.'
    : data?.message ?? 'Fetching the latest greeting...';

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
