import styled from '@emotion/styled';

export const MenuHeaderWrapper = styled.div`
  position: relative;
`;

export const MenuBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1009;
`;

export const MenuDropdown = styled.div`
  position: absolute;
  top: 56px;
  right: 16px;
  min-width: 120px;
  margin-top: 10px;
  padding: 8px;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  backdrop-filter: blur(25px);
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-radius: 16px;
  z-index: 1010;
`;

export const MenuItem = styled.button<{ variant?: 'default' | 'danger' }>`
  ${({ theme }) => theme.typography.body16Semibold}
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: ${({ theme, variant }) =>
    variant === 'danger' ? theme.colors.status.red[200] : theme.colors.gray[200]};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.blueWhite.bg8};
  }
`;
