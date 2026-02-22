import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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
`;
