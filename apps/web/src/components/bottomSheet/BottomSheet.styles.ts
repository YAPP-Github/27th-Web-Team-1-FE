import styled from '@emotion/styled';
interface SheetWrapperProps {
  $height: number;
  $isDragging: boolean;
}

export const SheetWrapper = styled.div<SheetWrapperProps>`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.blueWhite.bg8};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[40]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: ${({ $isDragging }) => ($isDragging ? 'none' : 'height 0.3s ease-out')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const HandleBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  touch-action: none;

  .handle {
    width: 40px;
    height: 5px;
    background-color: #e0e0e0;
    border-radius: 10px;
  }
`;

interface ActionColumnProps {
  $sheetHeight: number;
}

export const ActionColumn = styled.div<ActionColumnProps>`
  position: absolute;
  right: 12px;
  bottom: ${({ $sheetHeight }) => `${$sheetHeight + 12}px`};
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 1001;
`;

export const Content = styled.div<{
  $noPadding?: boolean;
  $isMaxHeight?: boolean;
  $isHomeContext?: boolean;
}>`
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '0px 20px')};
  flex: 1;
  overflow-x: ${({ $isHomeContext }) => ($isHomeContext ? 'visible' : 'hidden')};
  overflow-y: ${({ $isMaxHeight }) => ($isMaxHeight ? 'auto' : 'hidden')};
`;

export const FloatingButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100px;
  background: ${({ theme }) => theme.colors.gradient.black2};
  z-index: 1002;

  display: flex;
  justify-content: center;
  align-items: center;
`;
