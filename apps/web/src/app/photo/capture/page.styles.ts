import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
`;

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 16px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[0]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Canvas = styled.canvas`
  display: none;
`;

export const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
`;

export const CaptureButton = styled.button`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: transparent;
  border: 4px solid ${({ theme }) => theme.colors.gray[0]};
  cursor: pointer;
  transition: transform 0.1s;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray[0]};
    transition: transform 0.1s;
  }

  &:active::after {
    transform: translate(-50%, -50%) scale(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SwitchCameraButton = styled.button`
  position: absolute;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const ErrorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  gap: 16px;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  ${({ theme }) => theme.typography.body14Regular}
`;

export const RetryButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.blueWhite.bg5};
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[0]};
  ${({ theme }) => theme.typography.body14Regular}
`;

export const LoadingText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.text.secondary};
  ${({ theme }) => theme.typography.body14Regular}
`;
