import styled from '@emotion/styled';

export const CodeDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  width: 100%;
  height: 46px;
  background-color: rgba(226, 230, 255, 0.05);
  border-radius: 12px;

  ${({ theme }) => theme.typography.body16Regular};
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const CopyIconButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ExpiryText = styled.p`
  ${({ theme }) => theme.typography.body15Regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 8px 0 0 0;
  padding: 0;
  text-align: center;
`;
