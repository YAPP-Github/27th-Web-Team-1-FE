import styled from '@emotion/styled';

export const Wrapper = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  background: ${({ theme }) => theme.colors.blueWhite.bg5};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[25]};
  border-radius: 99px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

export const TextContainer = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.body14Semibold}
  color: ${({ theme }) => theme.colors.text.primary};
  justify-content: center;
  align-items: center;
  text-align: center;
`;
