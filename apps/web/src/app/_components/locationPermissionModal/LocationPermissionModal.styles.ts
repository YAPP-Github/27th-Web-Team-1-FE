import styled from '@emotion/styled';

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.body14Regular};
  color: ${({ theme }) => theme.colors.gray[200]};
`;
