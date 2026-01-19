import styled from '@emotion/styled';

export const Content = styled.div`
  /* TODO: 추후 반응형 디자인에 따른 width, height 설정 필요 */
  min-width: 280px;
  max-width: calc(100% - 32px);
  max-height: calc(100% - 32px);
  padding: 24px;
  background: ${({ theme }) => theme.colors.blueWhite.bg8};
  backdrop-filter: ${({ theme }) => theme.effects.backdropBlur[25]};
  border: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
`;
