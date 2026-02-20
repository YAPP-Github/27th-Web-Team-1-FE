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

const bgBlur = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100dvh;
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

export const BackButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[700]};
  cursor: pointer;
  margin-bottom: 24px;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[0]};
  }
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.heading24Bold};
  color: ${({ theme }) => theme.colors.gray[0]};
  text-align: center;
  margin: 0;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.body18Medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

export const CodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const KakaoIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;

  border-radius: 500px;
  background: #fee500;
`;

export const KakaoShareButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 9px;
  ${({ theme }) => theme.typography.body16Semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.body14Semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  align-self: stretch;
`;

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

export const ExpiryText = styled.p`
  ${({ theme }) => theme.typography.body15Regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 8px 0 0 0;
  padding: 0;
  text-align: center;
`;

export const CopyButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

export const ButtonGroup = styled.div`
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

export const ShareButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 9px;

  width: 100%;
  height: 46px;

  background: #fee500;
  border-radius: 8px;
  border: none;

  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.02em;
  color: #17181a;

  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RefreshButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;

  width: 100%;
  height: 46px;

  background: #403f44;
  border: none;
  border-radius: 8px;

  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.02em;
  color: #525156;

  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const InputDescription = styled.p`
  font-family: 'Pretendard';
  font-size: 18px;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.02em;
  color: #d3d3d3;
  margin: 0;
  text-align: center;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 10px;

  width: 100%;
  height: 46px;

  button {
    height: 100%;
  }

  > * {
    flex: 1;
  }
`;

export const SignOutButton = styled.button`
  ${({ theme }) => theme.typography.button14Bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: underline 2px solid;
`;

export const StartButtonWrapper = styled.div<{ isDisabled: boolean }>`
  display: flex;
  width: 100%;
  height: 46px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'pointer' : 'inherit')};

  button {
    width: 100%;
    height: 100%;
    ${({ isDisabled }) => isDisabled && 'pointer-events: none;'}
  }
`;
