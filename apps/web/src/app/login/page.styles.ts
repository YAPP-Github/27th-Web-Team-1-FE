import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  min-height: 100dvh;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 11px 0px;
  border: none;
  border-radius: 8px;
  background-color: #fee500;
  color: #000000;
  ${({ theme }) => theme.typography.body16Semibold}
  cursor: pointer;

  svg {
    display: block;
  }
`;
