import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import CheckSvg from '@/assets/images/check.svg';

const variantStyles = {
  checked: (theme: Theme) => css`
    background: ${theme.colors.gradient.mint};
  `,
  unchecked: (theme: Theme) => css`
    background: ${theme.colors.gray[900]};
    border: 1px solid ${theme.colors.gray[700]};
  `,
};

export const Wrapper = styled.label<{ checked: boolean }>`
  border-radius: 47px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  ${({ checked, theme }) =>
    checked ? variantStyles.checked(theme) : variantStyles.unchecked(theme)}
`;

export const InputContainer = styled.input``;

export const CheckIcon = styled(CheckSvg)<{ checked: boolean }>`
  fill: ${({ checked, theme }) =>
    checked ? theme.colors.gray[900] : theme.colors.gray[300]};
`;
