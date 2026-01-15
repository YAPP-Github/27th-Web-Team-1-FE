import styled from '@emotion/styled';

export const Card = styled.section(({ theme }) => ({
  backgroundColor: theme.colors.gray[1000],
  border: `1px solid ${theme.colors.gray[800]}`,
  borderRadius: '1rem',
  boxShadow: '0px 8px 30px rgba(15, 23, 42, 0.08)',
  maxWidth: '32rem',
  padding: '2rem',
  width: '100%',
}));

export const Heading = styled.h1(({ theme }) => ({
  color: theme.colors.gray[200],
  ...theme.typography.heading24Bold,
}));

export const Body = styled.p(({ theme }) => ({
  color: theme.colors.status.blue[200],
  ...theme.typography.body18Regular,
}));

export const Button = styled.button(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.primary[400],
  border: 'none',
  borderRadius: '999px',
  color: theme.colors.gradient.black1,
  cursor: 'pointer',
  display: 'inline-flex',
  gap: '0.4rem',
  justifyContent: 'center',
  padding: '0.75rem 1.5rem',
  transition: 'background-color 120ms ease-in-out, opacity 120ms ease-in-out',
  width: 'fit-content',

  ...theme.typography.button16Bold,

  '&:hover': {
    backgroundColor: theme.colors.primary[500],
  },

  '&:active': {
    backgroundColor: theme.colors.primary[600],
  },

  '&:disabled': {
    backgroundColor: theme.colors.primary[700],
    opacity: 0.6,
    cursor: 'not-allowed',
  },
}));

export const TestText = styled.p(({ theme }) => ({
  color: theme.colors.status.red[200],
  ...theme.typography.caption12Bold,
}));
