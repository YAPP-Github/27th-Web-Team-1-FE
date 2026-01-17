import styled from '@emotion/styled';

export const Wrapper = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  background: ${({ theme }) => theme.colors.blueWhite.bg5};
  ${({ theme }) => theme.effects.backdropBlur[25]};
  border-radius: 99px;
`;

export const TextContainer = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.body16Semibold}
  color: ${({ theme }) => theme.colors.text.primary};
  justify-content: center;
  align-items: center;
  text-align: center;
`;
