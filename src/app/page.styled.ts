import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  margin: 1rem 0;

  h1 {
    width: 100%;
    min-height: 11rem;
    font-family: ${({ theme }) => theme.typography.fontFamily.slabo};
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
