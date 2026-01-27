import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  background: ${({ theme }) => theme.colors.gray[1000]};
  overflow: hidden;
  user-select: none;
`;

export const PhotoBackground = styled.div<{ $url: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const TouchAreaLeft = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  width: 50%;
  bottom: 200px;
  z-index: 20;
  cursor: pointer;
`;

export const TouchAreaRight = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  width: 50%;
  bottom: 200px;
  z-index: 20;
  cursor: pointer;
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const BottomOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 115px 16px calc(40px + env(safe-area-inset-bottom, 0px));
  background: ${({ theme }) => theme.colors.gradient.black2};
  z-index: 10;
`;

export const ContainerA = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UploaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProfileImage = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray[600]};
  flex-shrink: 0;
`;

export const UploaderName = styled.span`
  ${({ theme }) => theme.typography.body14Semibold}
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const Memo = styled.p`
  ${({ theme }) => theme.typography.body14Regular}
  color: ${({ theme }) => theme.colors.gray[100]};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const ContainerB = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

export const SliderWrapper = styled.div`
  margin-top: 16px;
  margin-left: -16px;
  margin-right: -16px;
`;

export const ThumbnailSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ThumbnailItem = styled.button<{ $isActive: boolean }>`
  flex-shrink: 0;
  width: ${({ $isActive }) => ($isActive ? '56px' : '40px')};
  height: ${({ $isActive }) => ($isActive ? '78px' : '56px')};
  border-radius: 8px;
  overflow: hidden;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  scroll-snap-align: center;
  transition:
    width 0.2s,
    height 0.2s;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.typography.body16Regular}
  color: ${({ theme }) => theme.colors.gray[400]};
`;
