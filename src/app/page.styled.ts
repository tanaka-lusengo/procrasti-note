import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  margin: 4rem 0;

  a {
    color: #ff6161;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize.h4}rem;
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.3s ease-in-out;

    &:hover {
      border-bottom: 2px solid #ff6161;
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    p {
      max-width: 50%;
    }
  }
`;
