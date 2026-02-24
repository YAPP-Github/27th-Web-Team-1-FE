import styled from '@emotion/styled';

export const Description = styled.p`
  ${({ theme }) => theme.typography.heading16Bold};
  color: ${({ theme }) => theme.colors.gray[300]};
  text-align: center;
`;

export const ConfirmText = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
  text-align: center;
`;

export const InputSection = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
`;
