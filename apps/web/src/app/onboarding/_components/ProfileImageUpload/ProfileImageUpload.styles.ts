import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ImagePreview = styled.div<{ 'data-disabled'?: boolean }>`
  position: relative;
  width: 100px;
  height: 100px;
  cursor: ${({ 'data-disabled': disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  overflow: visible;
  padding: 0;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  svg {
    width: 50px;
    height: 50px;
  }
`;

export const CameraButton = styled.button`
  position: absolute;
  width: 28px;
  height: 28px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[5]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const CameraIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 50%;
`;
