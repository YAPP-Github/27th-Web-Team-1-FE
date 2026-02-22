import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
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
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 0.636px solid ${({ theme }) => theme.colors.blueWhite.border10};
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[5]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: ${({ theme }) => theme.colors.gray[100]};
`;
