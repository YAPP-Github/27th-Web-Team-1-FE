import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 32px 0;
`;

export const Input = styled.input<{ isFocused: boolean }>`
  width: 48px;
  height: 56px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  border: 2px solid
    ${({ theme, isFocused }) =>
      isFocused ? theme.colors.primary[500] : theme.colors.blueWhite.border10};
  border-radius: 8px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.blueWhite.bg5};
  transition: border-color 0.2s;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
