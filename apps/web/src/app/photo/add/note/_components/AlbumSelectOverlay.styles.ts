import styled from '@emotion/styled';

export const SearchAlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AlbumListWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LoadingText = styled.p`
  ${({ theme }) => theme.typography.body15Medium};
  color: ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
  padding: 24px 0;
`;

export const EmptyText = styled.p`
  ${({ theme }) => theme.typography.body15Medium};
  color: ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
  padding: 24px 0;
`;
