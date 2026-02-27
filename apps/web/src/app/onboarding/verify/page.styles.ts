import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bgBlur = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 450px;
    height: 450px;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      rgba(213, 255, 253, 0.1) 0%,
      rgba(110, 234, 228, 0.1) 100%
    );
    filter: blur(116.35px);
    animation: ${bgBlur} 0.8s ease-in-out;
    z-index: 0;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 40px 16px 24px;
  animation: ${fadeIn} 0.8s ease-in-out;
  animation-fill-mode: both;
  gap: 24px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-top: 4px solid ${({ theme }) => theme.colors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 14px;
`;

export const Title = styled.h1`
  font-family: 'Pretendard';
  font-size: 24px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-align: center;
  margin: 0;
  white-space: pre-line;
`;

export const Description = styled.p`
  font-family: 'Pretendard';
  font-size: 18px;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.02em;
  color: #d3d3d3;
  text-align: center;
  margin: 0;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 24px;
`;

export const Question = styled.h2`
  ${({ theme }) => theme.typography.heading24Bold}
  color: ${({ theme }) => theme.colors.gray[0]};
  margin: 0;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.body16Regular.fontSize};
    font-weight: ${theme.typography.body16Regular.fontWeight};
    line-height: ${theme.typography.body16Regular.lineHeight};
    letter-spacing: ${theme.typography.body16Regular.letterSpacing};
  `}
  color: ${({ theme }) => theme.colors.status.red[300]};
  margin: 0;
  text-align: center;
`;

export const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  text-align: center;
`;

export const SuccessEmoji = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

export const SuccessTitle = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.typography.heading24Bold.fontSize};
    font-weight: ${theme.typography.heading24Bold.fontWeight};
    line-height: ${theme.typography.heading24Bold.lineHeight};
    letter-spacing: ${theme.typography.heading24Bold.letterSpacing};
  `}
  color: ${({ theme }) => theme.colors.primary[500]};
  margin: 0 0 12px 0;
`;

export const SuccessMessage = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.body16Regular.fontSize};
    font-weight: ${theme.typography.body16Regular.fontWeight};
    line-height: ${theme.typography.body16Regular.lineHeight};
    letter-spacing: ${theme.typography.body16Regular.letterSpacing};
  `}
  color: ${({ theme }) => theme.colors.gray[700]};
  margin: 0;
`;

export const ButtonGroup = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 12px 16px 42px;
  margin: 0 auto;

  button {
    width: 100%;
  }
`;

export const UnderlineText = styled.button`
  ${({ theme }) => theme.typography.button14Bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: underline 2px solid;
`;
