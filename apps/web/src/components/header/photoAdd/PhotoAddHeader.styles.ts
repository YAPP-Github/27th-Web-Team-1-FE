import styled from '@emotion/styled';

export const Container = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.gray[1000]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  cursor: pointer;
`;
