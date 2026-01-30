import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

export const InputSection = styled.div`
  flex-shrink: 0;
  padding: 4px 0 0 0;
`;

export const GridSection = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  padding: 0px 0px 20px 0px;
`;
