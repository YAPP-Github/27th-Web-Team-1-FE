import styled from '@emotion/styled';

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const DateInputRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

export const DateBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(226, 230, 255, 0.05);
  padding: 10px 16px;
  flex: 1;
  min-width: 0;
`;

export const DateInput = styled.input<{ $charCount: number }>`
  ${({ theme }) => theme.typography.body16Regular};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.gray[100]};
  background: transparent;
  border: none;
  outline: none;
  text-align: right;
  padding: 0;
  width: ${({ $charCount }) => $charCount}ch;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const DateSuffix = styled.span<{ $isEmpty?: boolean }>`
  ${({ theme }) => theme.typography.body16Regular};
  color: ${({ theme, $isEmpty }) =>
    $isEmpty ? theme.colors.gray[400] : theme.colors.gray[100]};
`;
