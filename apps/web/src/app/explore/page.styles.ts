import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 96px;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

export const Subtitle = styled.p`
  ${({ theme }) => theme.typography.body15Regular}
  color: ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
`;
