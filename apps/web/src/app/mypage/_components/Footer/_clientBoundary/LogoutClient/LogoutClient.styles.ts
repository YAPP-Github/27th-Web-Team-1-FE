import styled from '@emotion/styled';

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #78787d;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.02em;
  padding: 0;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.heading18Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
  text-align: center;
  margin-bottom: 12px;
`;
