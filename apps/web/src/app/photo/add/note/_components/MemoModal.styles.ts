import styled from '@emotion/styled';

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const TextareaWrapper = styled.div`
  margin-bottom: 12px;
`;
