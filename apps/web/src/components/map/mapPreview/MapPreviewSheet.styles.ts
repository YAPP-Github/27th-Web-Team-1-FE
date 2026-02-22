import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.5);
`;

export const SheetWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.blueWhite.bg8};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[40]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding-bottom: 33px;
`;

export const HandleBar = styled.div`
  width: 100%;
  height: 28px;
  padding: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  .handle {
    width: 44px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.gray[400]};
    border-radius: 10px;
  }
`;

export const TitleSection = styled.div`
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
  margin: 0;
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.typography.body15Regular};
  color: ${({ theme }) => theme.colors.gray[300]};
  margin: 0;
`;

export const MapArea = styled.div`
  position: relative;
  margin: 0 20px 20px;
  border-radius: 12px;
  overflow: hidden;
  height: 200px;
`;

export const PinContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  z-index: 1;
`;

export const ButtonWrapper = styled.div`
  padding: 0 20px;

  button {
    width: 100%;
  }
`;
