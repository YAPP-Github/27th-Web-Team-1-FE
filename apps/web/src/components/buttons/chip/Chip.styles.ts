import { ChipSize, ChipVariant } from '@/types/button.type';
import { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import LocationSvg from '@/assets/images/location.svg';
import CancelSvg from '@/assets/images/cancel.svg';

const variantStyles = {
  black: (theme: Theme) => css`
    background: ${theme.colors.gray.a80};
    color: ${theme.colors.text.primary};
  `,
  white: (theme: Theme) => css`
    background: ${theme.colors.blueWhite.bg5};
    color: ${theme.colors.gray[0]};
  `,
};

const sizeStyles = {
  small: (theme: Theme) => css`
    ${theme.typography.caption12Bold}
    gap: 6px;
  `,
  medium: (theme: Theme) => css`
    ${theme.typography.body15Semibold}
    gap: 8px;
  `,
};

export const Wrapper = styled.div<{
  variant: ChipVariant;
  size: ChipSize;
}>`
  display: flex;
  width: fit-content;
  flex-direction: row;
  align-items: center;
  ${({ variant, theme }) => variantStyles[variant](theme)}
  ${({ size, theme }) => sizeStyles[size](theme)}
    border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-radius: 8px;
  padding: 6px 10px;
`;

export const LocationIcon = styled(LocationSvg)`
  width: 14px;
  height: 14px;
  fill: ${({ theme }) => theme.colors.gray[400]};
`;

export const CancelIcon = styled(CancelSvg)`
  width: 14px;
  height: 14px;
  fill: ${({ theme }) => theme.colors.gray[400]};
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
