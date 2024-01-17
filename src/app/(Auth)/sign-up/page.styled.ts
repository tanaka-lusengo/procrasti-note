import styled from 'styled-components';

export const Title = styled.h2`
  margin: 1rem 0 2rem;
  text-align: center;
`;

export const LowerButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.5rem;

  a {
    font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
    font-weight: bold;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
