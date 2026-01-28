import styled from '@emotion/styled';

export const SearchLocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LocationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LocationListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LocationItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2px;
`;

export const CheckIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg path {
    fill: ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const LocationTitle = styled.span`
  ${({ theme }) => theme.typography.body16Semibold};
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const LocationDetail = styled.span`
  ${({ theme }) => theme.typography.body14Regular};
  color: ${({ theme }) => theme.colors.gray[300]};
`;

export const LoadingText = styled.p`
  ${({ theme }) => theme.typography.body16Medium};
  color: ${({ theme }) => theme.colors.gray[300]};
`;

export const EmptyText = styled.p`
  ${({ theme }) => theme.typography.body15Medium};
  color: ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
  padding: 24px 0;
`;
