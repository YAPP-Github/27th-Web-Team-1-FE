import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[0]};
  margin: 0 0 8px 0;
  text-align: center;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.body16Regular}
  color: ${({ theme }) => theme.colors.gray[500]};
  margin: 0 0 24px 0;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  button {
    flex: 1;
  }
`;
