import styled from '@emotion/styled';

export const Content = styled.div`
  /* TODO: 추후 반응형 디자인에 따른 width, height 설정 필요 */
  width: calc(100% - 40px);
  max-width: calc(100% - 40px);
  max-height: calc(100% - 40px);
  padding: 24px;
  background: ${({ theme }) => theme.colors.gray[1000]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

export const Footer = styled.footer`
  width: calc(100% + 48px);
  margin: 0 -24px -24px -24px;
  display: flex;
  justify-content: center;
  padding: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
