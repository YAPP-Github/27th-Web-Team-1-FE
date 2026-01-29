import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  cursor: grab;
  white-space: nowrap;

  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
