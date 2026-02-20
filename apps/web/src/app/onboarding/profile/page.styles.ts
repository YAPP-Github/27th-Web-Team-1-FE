import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

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
  padding: 94px 16px 18px 16px;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 450px;
    height: 450px;
    left: 50%;
    top: 90px;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      rgba(213, 255, 253, 0.1) 0%,
      rgba(110, 234, 228, 0.1) 100%
    );
    filter: blur(116.35px);
    pointer-events: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  padding-top: 40px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-in-out;
  animation-fill-mode: both;
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.typography.heading24Bold.fontSize};
    font-weight: ${theme.typography.heading24Bold.fontWeight};
    line-height: ${theme.typography.heading24Bold.lineHeight};
    letter-spacing: ${theme.typography.heading24Bold.letterSpacing};
  `}
  color: ${({ theme }) => theme.colors.gray[0]};
  margin: 0 0 8px 0;
`;

export const Description = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 32px;
  gap: 16px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 300px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 430px;
  padding: 24px 0;
  z-index: 1;
`;
