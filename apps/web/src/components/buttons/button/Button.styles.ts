import { ButtonSize, ButtonVariant } from '@/types/button.type';
import { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const variantStyles = {
  highlight: (theme: Theme) => css`
    background: ${theme.colors.gradient.mint};
    color: ${theme.colors.gray[1000]};
    border-radius: 8px;

    &:hover {
      background: ${theme.colors.gradient.mintHover};
    }

    &:disabled {
      color: ${theme.colors.gray[600]};
      background: ${theme.colors.gray[700]};
      cursor: not-allowed;
    }

    &:active {
      background: ${theme.colors.gradient.mintHover};
    }
  `,

  primary: (theme: Theme) => css`
    background: ${theme.colors.gray[0]};
    color: ${theme.colors.gray[1000]};
    border-radius: 8px;

    &:hover {
      background: ${theme.colors.gray[100]};
    }

    &:disabled {
      color: ${theme.colors.gray[600]};
      background: ${theme.colors.gray[700]};
      cursor: not-allowed;
    }

    &:active {
      background: ${theme.colors.gray[100]};
    }
  `,

  secondary: (theme: Theme) => css`
    background: ${theme.colors.gray[900]};
    color: ${theme.colors.gray[0]};
    border-radius: 8px;
    border: 1px solid ${theme.colors.blueWhite.border10};

    &:hover {
      background: ${theme.colors.gray[800]};
    }

    &:disabled {
      background: ${theme.colors.gray[700]};
      color: ${theme.colors.gray[600]};
      cursor: not-allowed;
    }

    &:active {
      background: ${theme.colors.gray[800]};
    }
  `,
};

const sizeStyles = {
  small: (theme: Theme) => css`
    ${theme.typography.button14Bold}
    padding: 7px 12px;
  `,
  medium: (theme: Theme) => css`
    ${theme.typography.button14Bold}
    padding: 10px 16px;
  `,
  large: (theme: Theme) => css`
    ${theme.typography.button16Bold}
    padding: 12px 16px;
  `,
};

export const Button = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
}>`
  ${({ variant, theme }) => variantStyles[variant](theme)}
  ${({ size, theme }) => sizeStyles[size](theme)}
`;
