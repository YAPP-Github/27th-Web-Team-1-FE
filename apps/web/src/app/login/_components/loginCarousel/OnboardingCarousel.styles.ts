import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow: hidden;
  padding: 105px 0 0 0;
`;

export const DotContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;
  margin-bottom: 40px;
`;

export const Dot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.gradient.mint : theme.colors.gray[600]};
  transition: background-color 0.3s ease;
`;

export const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  aspect-ratio: 1;
  will-change: transform;
`;

export const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 100%;
  flex-shrink: 0;
  gap: 44px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading24Bold}
  color: ${({ theme }) => theme.colors.gray[0]};
  white-space: pre-line;
  word-break: keep-all;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.body16Regular}
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: pre-line;
  word-break: keep-all;
`;
