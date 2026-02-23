import styled from '@emotion/styled';

export const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[25]};
  color: ${({ theme }) => theme.colors.gray[100]};
`;
