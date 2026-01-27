import styled from '@emotion/styled';
import { MenuPlacement } from './MenuButton';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const TriggerButton = styled.button`
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  padding: 11px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
`;

export const MenuPanel = styled.div<{ placement: MenuPlacement }>`
  position: absolute;
  ${({ placement }) => (placement === 'bottom' ? 'top: 52px;' : 'bottom: 52px;')}
  right: 0;
  z-index: 101;

  min-width: 160px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[25]};
  border-radius: 16px;
`;
