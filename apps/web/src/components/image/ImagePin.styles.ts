import styled from '@emotion/styled';

export const PinButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3));

  transition: transform 0.1s ease-in-out;
  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gray[500]};
    border-radius: 20px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 74px;
  height: 100px;
  border: 4px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 18px;
  z-index: 2;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 14px;
`;

export const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  min-width: 21px;
  height: 26px;
  padding: 2px 6px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  ${({ theme }) => theme.typography.body14Semibold};
  color: ${({ theme }) => theme.colors.gray[900]};
  border-radius: 99px;
  z-index: 1;
`;

export const Tail = styled.div`
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 4px;
  transform: rotate(45deg);
  margin-top: -12px;
`;
