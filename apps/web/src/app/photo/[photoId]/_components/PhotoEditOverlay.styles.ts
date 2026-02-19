import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
`;

export const PhotoSection = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

export const PhotoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

export const MemoAlbumOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.colors.gradient.black2};
`;

export const BottomContainer = styled.div`
  padding: 12px 20px 33px;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
`;

export const TooltipWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 16px;
`;

export const Tooltip = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.gray.a80};
  border-radius: 10px;
  backdrop-filter: blur(5px);

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.gray.a80};
    border-radius: 2px;
  }
`;

export const TooltipIcon = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TooltipText = styled.span`
  ${({ theme }) => theme.typography.body15Semibold};
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const TooltipButton = styled.button`
  ${({ theme }) => theme.typography.body15Semibold};
  color: ${({ theme }) => theme.colors.gray[400]};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

export const MemoButton = styled.button`
  ${({ theme }) => theme.typography.body15Regular};
  color: ${({ theme }) => theme.colors.gray[100]};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  white-space: pre-wrap;

  &:active {
    opacity: 0.8;
  }
`;

export const AlbumButtonWrapper = styled.div`
  display: flex;
`;

export const AlbumButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: ${({ theme }) => theme.colors.gray[900]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-radius: 8px;
  cursor: pointer;

  &:active {
    background: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const AlbumIcon = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const AlbumText = styled.span`
  ${({ theme }) => theme.typography.body15Semibold};
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const AlbumResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MapPreviewButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.gray[900]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-radius: 999px;
  cursor: pointer;

  &:active {
    background: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const MapIcon = styled.div`
  width: 16px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const MapPreviewText = styled.span`
  ${({ theme }) => theme.typography.body16Semibold};
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.gradient.mint};
  border: none;
  cursor: pointer;

  &:active {
    background: ${({ theme }) => theme.colors.gradient.mintHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray[700]};
    cursor: not-allowed;
  }
`;

export const SaveIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
