import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 16px;
  background: ${({ theme }) => theme.colors.blueWhite.bg5};
  border-radius: 12px;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1;
`;

export const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px 0 0 12px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  flex-shrink: 0;
`;

export const ThumbnailFallback = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px 0 0 12px;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  min-width: 0;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typography.body15Medium}
  color: ${({ theme }) => theme.colors.gray[100]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PhotoCount = styled.span`
  ${({ theme }) => theme.typography.body15Medium}
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const RadioButton = styled.div<{ isSelected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: ${({ isSelected }) => (isSelected ? '4px' : '3px')} solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.colors.gray[200] : theme.colors.blueWhite.bg5};
  background: ${({ theme }) => theme.colors.blueWhite.bg5};
  flex-shrink: 0;
  box-sizing: border-box;
  transition:
    border-color 0.1s ease,
    border-width 0.1s ease;
`;
