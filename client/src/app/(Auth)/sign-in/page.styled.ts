import styled from 'styled-components';

export const Title = styled.h2`
  margin: 1rem 0 2rem;
  text-align: center;
`;

export const UpperButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Divider = styled.div`
  margin: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const LowerButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;

  a {
    font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
    font-weight: bold;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
