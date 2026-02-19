import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

const SPACING = {
  GAP: 10,
  PADDING_VERTICAL: 10,
  PADDING_HORIZONTAL: 12,
  MARGIN_TOP: 8,
} as const;

const SIZES = {
  BORDER_RADIUS: 8,
  MIN_HEIGHT: 100,
} as const;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TextareaWrapper = styled.label<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: ${SIZES.MIN_HEIGHT}px;
  padding: ${SPACING.PADDING_VERTICAL}px ${SPACING.PADDING_HORIZONTAL}px;
  background: ${({ theme }) => theme.colors.blueWhite.bg5};
  border: 1px solid
    ${({ theme, isError }) =>
      isError ? theme.colors.status.red[200] : theme.colors.blueWhite.border10};
  border-radius: ${SIZES.BORDER_RADIUS}px;
  box-sizing: border-box;
  cursor: text;

  &:focus-within {
    border-color: ${({ theme, isError }) =>
      isError ? theme.colors.status.red[200] : theme.colors.gray[400]};
  }
`;

const baseTextareaStyles = (theme: Theme) => css`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.gray[100]};
  font-family: inherit;
  ${theme.typography.body16Medium}

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

export const StyledTextarea = styled.textarea`
  ${({ theme }) => baseTextareaStyles(theme)}
  resize: none;
`;

export const TextareaFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${SPACING.GAP}px;
  margin-top: ${SPACING.MARGIN_TOP}px;
`;

export const CharCount = styled.span`
  ${({ theme }) => theme.typography.body16Regular}
  flex-shrink: 0;
`;

export const CurrentCount = styled.span`
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const MaxCount = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => theme.typography.body15Regular}
  color: ${({ theme }) => theme.colors.status.red[200]};
  margin-top: ${SPACING.MARGIN_TOP}px;
`;
