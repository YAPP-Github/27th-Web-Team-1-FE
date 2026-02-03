import styled from '@emotion/styled';

export const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const LocationIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gray[200]};
`;

export const LocationText = styled.span`
  ${({ theme }) => theme.typography.heading18Bold}
  color: ${({ theme }) => theme.colors.gray[100]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  width: 100%;
  text-align: center;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;
