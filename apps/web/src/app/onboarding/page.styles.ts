import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100dvh;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 450px;
    height: 450px;
    left: 50%;
    top: 150px;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      rgba(213, 255, 253, 0.3) 0%,
      rgba(110, 234, 228, 0.3) 100%
    );
    filter: blur(116.35px);
    pointer-events: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-in-out;
  animation-delay: 500ms;
  animation-fill-mode: both;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.heading24Bold}
  color: ${({ theme }) => theme.colors.gray[0]};
  margin: 0 0 16px 0;
`;
