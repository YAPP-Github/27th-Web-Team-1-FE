import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(
      800px 300px at 20% 10%,
      rgba(110, 234, 228, 0.18),
      rgba(36, 36, 38, 0)
    ),
    ${({ theme }) => theme.colors.gray[1000]};
`;

export const Card = styled.div`
  width: min(420px, 100%);
  padding: 32px 28px;
  background-color: ${({ theme }) => theme.colors.gray[900]};
  border: 1px solid ${({ theme }) => theme.colors.gray[800]};
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.heading20Bold};
  color: ${({ theme }) => theme.colors.gray[0]};
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Helper = styled.p<{ tone?: 'error' | 'muted' }>`
  ${({ theme }) => theme.typography.body14Regular};
  color: ${({ theme, tone }) =>
    tone === 'error' ? theme.colors.status.red[200] : theme.colors.text.secondary};
  margin: 0;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
