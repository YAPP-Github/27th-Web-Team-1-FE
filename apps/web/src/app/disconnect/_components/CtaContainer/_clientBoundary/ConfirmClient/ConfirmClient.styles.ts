import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Circle = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  border: ${({ isChecked }) => (isChecked ? 'none' : '1px solid #403F44')};
  background: ${({ isChecked }) => (isChecked ? '#FF4D5F' : '#302F32')};
  color: ${({ isChecked }) => (isChecked ? '#FFFFFF' : '#B2B2B4')};
`;

export const Label = styled.span`
  ${({ theme }) => theme.typography.body16Semibold}
  color: ${({ theme }) => theme.colors.text.primary};
`;
