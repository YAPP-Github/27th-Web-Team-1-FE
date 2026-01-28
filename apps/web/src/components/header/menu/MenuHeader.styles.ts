import styled from '@emotion/styled';

export const MenuHeaderWrapper = styled.div`
  position: relative;
`;

export const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[100]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LocationIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[200]};
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
  z-index: 100;
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
