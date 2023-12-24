import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  margin: 4rem 0;

  h1 {
    font-family: ${({ theme }) => theme.typography.fontFamily.slabo};
    min-height: 11rem;
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.typography.fontFamily.ultra};
    font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
    border-bottom: 2.5px solid transparent;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 0.5rem 1rem;
    border-radius: 10px;
    transition: 0.4s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    h1 {
      min-height: 0;
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: 4rem;

    p {
      max-width: 50%;
    }
  }
`;
