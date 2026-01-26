import styled from '@emotion/styled';

export const Container = styled.header<{ transparent?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.gradient.black1};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 60px;
`;

export const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 60px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[100]};
  margin: 0;
`;
