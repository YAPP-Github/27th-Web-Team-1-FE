import styled from '@emotion/styled';

export const Root = styled.div`
  position: fixed;
  inset: 0;

  z-index: ${({ theme }) => theme.zIndex.popupRoot};

  isolation: isolate;
  pointer-events: none;
`;

export const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: auto;
`;

export const Layer = styled.div`
  position: absolute;
  inset: 0;

  pointer-events: auto;

  display: flex;

  align-items: center;
  justify-content: center;
`;
