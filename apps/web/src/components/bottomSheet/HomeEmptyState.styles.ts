import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.typography.body14Regular};
  color: ${({ theme }) => theme.colors.gray[400]};
  margin: 0;
`;

export const CardRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const Card = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.blueWhite.bg8};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  min-height: 180px;
  text-align: left;
`;

export const CardLabel = styled.span`
  ${({ theme }) => theme.typography.body14Regular};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const CardTitle = styled.span`
  ${({ theme }) => theme.typography.heading16Bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const IconWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`;
