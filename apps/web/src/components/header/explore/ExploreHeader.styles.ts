import styled from '@emotion/styled';

export const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const LocationIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[200]};
`;

export const LocationText = styled.span`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[100]};
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;
