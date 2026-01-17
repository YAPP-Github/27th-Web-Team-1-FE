import { TextButtonVariant } from '@/types/button.type';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

const variantStyles = {
  default: (theme: Theme) => css`
    color: ${theme.colors.text.primary};
  `,
  primary: (theme: Theme) => css`
    color: ${theme.colors.primary[400]};
  `,
  negative: (theme: Theme) => css`
    color: ${theme.colors.status.red[200]};
  `,
};
export const Wrapper = styled.button<{ variant: TextButtonVariant; disabled?: boolean }>`
  ${({ theme }) => theme.typography.body16Semibold}
  padding: 12px 16px;
  border-radius: 8px;
  ${({ variant, theme }) => variantStyles[variant](theme)}

  &:disabled {
    color: ${({ theme }) => theme.colors.gray[600]};
    cursor: not-allowed;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blueWhite.bg8};
  }

  &:active {
    background: ${({ theme }) => theme.colors.blueWhite.bg8};
  }
`;
