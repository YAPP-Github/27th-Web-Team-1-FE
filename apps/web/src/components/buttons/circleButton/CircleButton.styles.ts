import styled from '@emotion/styled';

export const Wrapper = styled.button`
  display: flex;
  padding: 11px;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
`;
