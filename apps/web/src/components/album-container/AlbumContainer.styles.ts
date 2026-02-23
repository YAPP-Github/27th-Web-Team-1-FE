import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ALBUM_CONTAINER_TYPE, AlbumContainerType } from './AlbumContainer.constants';

const containerTypeStyles = {
  small: () => css`
    width: 56px;
  `,
  medium: () => css`
    width: 100%;
  `,
};

const gridTypeStyles = {
  small: () => css`
    width: 56px;
    height: 56px;
    gap: 4.94px;
    padding: 4.94px;
  `,
  medium: () => css`
    max-width: 180px;
    width: 100%;
    aspect-ratio: 1 / 1;
    gap: 7.3px;
    padding: 7.3px;
  `,
};

export const Container = styled.div<{ type: AlbumContainerType }>`
  display: flex;
  flex-direction: column;
  gap: ${({ type }) => (type === ALBUM_CONTAINER_TYPE.SMALL ? '4px' : '8px')};
  cursor: pointer;
  ${({ type }) => containerTypeStyles[type]()}
`;

export const PhotoGrid = styled.div<{ type: AlbumContainerType }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  ${({ type }) => gridTypeStyles[type]()}
`;

export const PhotoWrapper = styled.div<{ type: AlbumContainerType }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: ${({ type }) => (type === ALBUM_CONTAINER_TYPE.SMALL ? '4px' : '10px')};
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
`;

export const EmptyPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
`;

export const MoreOverlay = styled.div<{ type: AlbumContainerType }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[0]};
  ${({ type, theme }) =>
    type === ALBUM_CONTAINER_TYPE.SMALL
      ? theme.typography.caption12Bold
      : theme.typography.heading18Bold}
`;

export const InfoSection = styled.div<{ type: AlbumContainerType }>`
  display: flex;
  flex-direction: column;
  ${({ type }) =>
    type === ALBUM_CONTAINER_TYPE.SMALL &&
    css`
      align-items: center;
      text-align: center;
    `}
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typography.body16Medium}
  color: ${({ theme }) => theme.colors.gray[200]};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const PhotoCount = styled.span`
  ${({ theme }) => theme.typography.body14Semibold}
  color: ${({ theme }) => theme.colors.gray[400]};
`;
