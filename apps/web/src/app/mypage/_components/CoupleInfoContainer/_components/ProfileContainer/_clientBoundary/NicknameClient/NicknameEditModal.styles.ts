import styled from '@emotion/styled';

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;
