import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  max-width: 100%;
`;

export const Text = styled.span`
  ${({ theme }) => theme.typography.body16Semibold}
  color: ${({ theme }) => theme.colors.gray[200]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EditIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[400]};
`;
