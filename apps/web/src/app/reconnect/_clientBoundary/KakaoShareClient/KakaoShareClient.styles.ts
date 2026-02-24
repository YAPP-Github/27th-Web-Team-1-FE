import styled from '@emotion/styled';

export const KakaoShareButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 9px;
  ${({ theme }) => theme.typography.body16Semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const KakaoIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;

  border-radius: 500px;
  background: #fee500;
`;
