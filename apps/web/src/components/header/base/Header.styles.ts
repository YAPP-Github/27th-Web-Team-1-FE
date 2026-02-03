import styled from '@emotion/styled';

export const Container = styled.header<{ transparent?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.gradient.black1};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  min-width: 60px;
  flex-shrink: 0;
`;

export const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  overflow: hidden;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 60px;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[100]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;
