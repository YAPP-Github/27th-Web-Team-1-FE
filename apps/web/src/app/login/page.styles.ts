import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100dvh;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray[1000]};
  position: relative;
  overflow: hidden;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
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
