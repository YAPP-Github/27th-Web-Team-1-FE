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
