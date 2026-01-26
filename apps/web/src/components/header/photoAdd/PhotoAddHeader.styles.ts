import styled from '@emotion/styled';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  min-width: 44px;
`;

export const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  min-width: 44px;
`;

export const LocationIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[200]};
`;

export const LocationText = styled.span`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const LocationPlaceholder = styled.span`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.gray[1000]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  cursor: pointer;
`;
