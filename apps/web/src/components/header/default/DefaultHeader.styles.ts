import styled from '@emotion/styled';

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray[200]};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.blueWhite.bg8};
  }

  &:active {
    background: ${({ theme }) => theme.colors.blueWhite.bg8};
  }
`;

export const CircleIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[5]};
  color: ${({ theme }) => theme.colors.gray[100]};
  cursor: pointer;
`;

export const TextButton = styled.button<{ disabled?: boolean }>`
  ${({ theme }) => theme.typography.body18Semibold}
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray[600] : theme.colors.primary[400]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blueWhite.bg8};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.blueWhite.bg8};
  }
`;
