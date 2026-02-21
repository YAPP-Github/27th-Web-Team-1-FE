import styled from '@emotion/styled';

export const Container = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 118 / 157;
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  background: transparent;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.blueWhite.bg8};
`;

export const DateBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 41px;
  height: 41px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const Day = styled.span`
  ${({ theme }) => theme.typography.heading18Bold}
  line-height: 1;
`;

export const Month = styled.span`
  ${({ theme }) => theme.typography.caption11Regular}
  line-height: 1;
`;

export const ProgressOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 1.5px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.gray[0]};
  border-radius: 1.5px;
  transition: width 0.3s ease;
`;

export const ErrorOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorText = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.status.red[200]};
  color: ${({ theme }) => theme.colors.gray[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.caption12Regular}
  font-weight: 700;
`;

export const Fallback = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.blueWhite.bg8};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  ${({ theme }) => theme.typography.caption12Regular}
  text-align: center;
  padding: 8px;
  word-break: keep-all;
`;
