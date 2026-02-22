import styled from '@emotion/styled';

export const Text = styled.span`
  ${({ theme }) => theme.typography.body14Semibold}
  color: ${({ theme }) => theme.colors.gray[0]};
  cursor: pointer;
`;
