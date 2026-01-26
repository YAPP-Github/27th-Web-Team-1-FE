import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import SearchSvg from '@/assets/images/search.svg';
import ResetSvg from '@/assets/images/reset.svg';

const SPACING = {
  GAP: 10,
  PADDING_VERTICAL: 10,
  PADDING_HORIZONTAL: 12,
  MARGIN_TOP: 8,
} as const;

const SIZES = {
  BORDER_RADIUS: 8,
  INPUT_HEIGHT: 26,
  SEARCH_ICON: 20,
  RESET_ICON: 16,
} as const;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  align-items: center;
  gap: ${SPACING.GAP}px;
  padding: ${SPACING.PADDING_VERTICAL}px ${SPACING.PADDING_HORIZONTAL}px;
  background: ${({ theme }) => theme.colors.blueWhite.bg5};
  border: 1px solid
    ${({ theme, isError }) =>
      isError ? theme.colors.status.red[200] : theme.colors.blueWhite.border10};
  border-radius: ${SIZES.BORDER_RADIUS}px;

  &:focus-within {
    border-color: ${({ theme, isError }) =>
      isError ? theme.colors.status.red[200] : theme.colors.gray[400]};
  }
`;

const baseInputStyles = (theme: Theme) => css`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.gray[100]};
  ${theme.typography.body16Regular}

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

export const StyledInput = styled.input`
  ${({ theme }) => baseInputStyles(theme)}
  height: ${SIZES.INPUT_HEIGHT}px;
`;

export const SearchIcon = styled(SearchSvg)`
  width: ${SIZES.SEARCH_ICON}px;
  height: ${SIZES.SEARCH_ICON}px;
  flex-shrink: 0;

  path {
    fill: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const ResetIcon = styled(ResetSvg)`
  width: ${SIZES.RESET_ICON}px;
  height: ${SIZES.RESET_ICON}px;
  flex-shrink: 0;
`;

export const ResetButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
`;

export const CharCount = styled.span`
  ${({ theme }) => theme.typography.body16Regular}
  color: ${({ theme }) => theme.colors.gray[100]};
  flex-shrink: 0;
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => theme.typography.body15Regular}
  color: ${({ theme }) => theme.colors.status.red[200]};
  margin-top: ${SPACING.MARGIN_TOP}px;
`;
