import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 81px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid rgba(226, 230, 255, 0.1);
  background: ${({ theme }) => theme.colors.blueWhite.bg5};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[40]};
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

export const Caption = styled.span`
  ${({ theme }) => theme.typography.caption12Regular}
  color: ${({ theme }) => theme.colors.gray[200]};
`;

export const DdayRow = styled.span`
  ${({ theme }) => theme.typography.heading24Bold}
  display: flex;
  gap: 2px;
`;

export const DdayPrefix = styled.span`
  color: ${({ theme }) => theme.colors.gray[300]};
`;

export const DdayNumber = styled.span`
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const EmptyText = styled.span`
  ${({ theme }) => theme.typography.body18Semibold}
  color: ${({ theme }) => theme.colors.gray[300]};
  padding: 4px;
`;

export const ChevronIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[200]};
`;
