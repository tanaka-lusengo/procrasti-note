import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  margin: 1rem 0;

  h1 {
    font-family: ${({ theme }) => theme.typography.fontFamily.slabo};
    min-height: 11rem;
    width: 100%;
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
