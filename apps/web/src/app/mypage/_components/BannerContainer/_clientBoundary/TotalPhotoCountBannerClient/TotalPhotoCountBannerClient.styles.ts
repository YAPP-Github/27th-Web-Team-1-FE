import styled from '@emotion/styled';

export const Wrapper = styled.div<{ $photoUrl?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(226, 230, 255, 0.1);
  background: ${({ $photoUrl }) =>
    $photoUrl
      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(${$photoUrl}) center / cover no-repeat`
      : 'rgba(226, 230, 255, 0.05)'};
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

export const CountRow = styled.span`
  ${({ theme }) => theme.typography.heading24Bold}
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const ChevronIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[200]};
`;
