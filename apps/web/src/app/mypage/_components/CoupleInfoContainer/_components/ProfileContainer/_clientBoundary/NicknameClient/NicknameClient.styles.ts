import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  right: -16px; /* gap(4) + icon(12) */
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[400]};
`;
