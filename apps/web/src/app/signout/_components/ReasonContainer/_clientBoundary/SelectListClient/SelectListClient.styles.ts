import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.blueWhite.border10};
  }
`;

export const Circle = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
  border: ${({ isChecked }) => (isChecked ? 'none' : '0.75px solid #403F44')};
  background: ${({ isChecked }) =>
    isChecked ? 'linear-gradient(180deg, #D5FFFD 0%, #6EEAE4 100%)' : '#302F32'};

  color: ${({ isChecked }) => (isChecked ? '#302F32' : '#B2B2B4')};
`;

export const Label = styled.span`
  ${({ theme }) => theme.typography.body16Medium}
  color: ${({ theme }) => theme.colors.text.secondary};
`;
