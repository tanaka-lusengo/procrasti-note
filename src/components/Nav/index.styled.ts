import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;

  h1 {
    margin-right: 2rem;
    font-family: ${({ theme }) => theme.typography.fontFamily.ultra};
    font-size: ${({ theme }) => theme.typography.fontSize.h4}rem;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  li {
    margin: 0 1rem;
    list-style: none;
  }

  a {
    font-weight: bold;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: flex-start;
  }
`;
